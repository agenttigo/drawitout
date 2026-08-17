import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSocket } from '../../context/SocketContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSelector } from '../Common/LanguageSelector';
import { ThemeToggle } from '../Common/ThemeToggle';
import { StudioCanvas } from './StudioCanvas';
import { StudioToolbar } from './StudioToolbar';
import { StudioLayers } from './StudioLayers';
import { TimelapseModal } from './TimelapseModal';
import { StudioExportModal } from './StudioExportModal';
import {
  ArrowLeft,
  Sparkles,
  Users,
  Copy,
  Check,
  Layers,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function StudioRoom({ playerName = 'Művész', avatar = {}, onLeave }) {
  const { socket } = useSocket();
  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Studio Settings & State
  const [layers, setLayers] = useState(() => [
    { id: 'layer-bg', name: t('studio_layer_bg'), visible: true, opacity: 1, locked: false },
    { id: 'layer-sketch', name: t('studio_layer_sketch'), visible: true, opacity: 1, locked: false },
    { id: 'layer-color', name: t('studio_layer_color'), visible: true, opacity: 1, locked: false },
  ]);

  const [activeLayerId, setActiveLayerId] = useState('layer-color');
  const [strokes, setStrokes] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  // Active Tool Configurations
  const [activeTool, setActiveTool] = useState('pen');
  const [currentColor, setCurrentColor] = useState('#1e242b');
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [strokeOpacity, setStrokeOpacity] = useState(1);
  const [stabilizer, setStabilizer] = useState(0.5);
  const [usePressure, setUsePressure] = useState(true);
  const [symmetryMode, setSymmetryMode] = useState('none');
  const [activeShape, setActiveShape] = useState('none');
  const [gridMode, setGridMode] = useState('none');

  // Modals
  const [showTimelapseModal, setShowTimelapseModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showLayersPanel, setShowLayersPanel] = useState(true);

  // Multiplayer Collaboration State
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [studioRoomId, setStudioRoomId] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [copiedLink, setCopiedLink] = useState(false);

  // Multiplayer Socket Sync
  useEffect(() => {
    if (!socket || !isMultiplayer || !studioRoomId) return;

    socket.emit(
      'studio_join',
      {
        roomId: studioRoomId,
        user: { name: playerName, avatar, color: currentColor },
      },
      (res) => {
        if (res.success && res.studioState) {
          if (res.studioState.layers?.length > 0) setLayers(res.studioState.layers);
          if (res.studioState.strokes?.length > 0) setStrokes(res.studioState.strokes);
          setCollaborators(res.studioState.users || []);
        }
      }
    );

    const handleRemoteStroke = (remoteStroke) => {
      setStrokes((prev) => [...prev, remoteStroke]);
    };

    const handleRemoteLayers = (remoteLayers) => {
      setLayers(remoteLayers);
    };

    const handleRemoteCursor = ({ userId, cursor }) => {
      setCollaborators((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, cursor } : u))
      );
    };

    const handleUserJoined = ({ user }) => {
      setCollaborators((prev) => [...prev.filter((u) => u.id !== user.id), user]);
      soundEngine.playPop();
    };

    const handleUserLeft = ({ userId }) => {
      setCollaborators((prev) => prev.filter((u) => u.id !== userId));
    };

    const handleRemoteClear = () => {
      setStrokes([]);
      setUndoStack([]);
    };

    socket.on('studio_stroke', handleRemoteStroke);
    socket.on('studio_layers_update', handleRemoteLayers);
    socket.on('studio_cursor_move', handleRemoteCursor);
    socket.on('studio_user_joined', handleUserJoined);
    socket.on('studio_user_left', handleUserLeft);
    socket.on('studio_clear', handleRemoteClear);

    return () => {
      socket.off('studio_stroke', handleRemoteStroke);
      socket.off('studio_layers_update', handleRemoteLayers);
      socket.off('studio_cursor_move', handleRemoteCursor);
      socket.off('studio_user_joined', handleUserJoined);
      socket.off('studio_user_left', handleUserLeft);
      socket.off('studio_clear', handleRemoteClear);
    };
  }, [socket, isMultiplayer, studioRoomId, playerName, avatar, currentColor]);

  const handleAddStroke = (newStroke) => {
    setStrokes((prev) => [...prev, newStroke]);
    setUndoStack([]);

    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_stroke', { roomId: studioRoomId, stroke: newStroke });
    }
  };

  const handleUndo = () => {
    if (strokes.length === 0) return;
    const last = strokes[strokes.length - 1];
    setStrokes((prev) => prev.slice(0, -1));
    setUndoStack((prev) => [...prev, last]);
  };

  const handleRedo = () => {
    if (undoStack.length === 0) return;
    const next = undoStack[undoStack.length - 1];
    setUndoStack((prev) => prev.slice(0, -1));
    setStrokes((prev) => [...prev, next]);
  };

  const handleClearAll = () => {
    if (window.confirm(t('studio_clear_confirm'))) {
      setStrokes([]);
      setUndoStack([]);
      if (socket && isMultiplayer && studioRoomId) {
        socket.emit('studio_clear', { roomId: studioRoomId });
      }
    }
  };

  const handleAddLayer = () => {
    if (layers.length >= 5) return;
    const newId = `layer-${Date.now()}`;
    const newLayer = {
      id: newId,
      name: `${layers.length + 1}. ${t('studio_layer_name')}`,
      visible: true,
      opacity: 1,
      locked: false,
    };
    const updated = [newLayer, ...layers];
    setLayers(updated);
    setActiveLayerId(newId);

    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_layers_update', { roomId: studioRoomId, layers: updated });
    }
  };

  const handleDeleteLayer = (layerId) => {
    if (layers.length <= 1) return;
    const updated = layers.filter((l) => l.id !== layerId);
    setLayers(updated);
    if (activeLayerId === layerId) {
      setActiveLayerId(updated[0]?.id || '');
    }
    setStrokes((prev) => prev.filter((s) => s.layerId !== layerId));

    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_layers_update', { roomId: studioRoomId, layers: updated });
    }
  };

  const handleDuplicateLayer = (layerId) => {
    if (layers.length >= 5) return;
    const target = layers.find((l) => l.id === layerId);
    if (!target) return;

    const newId = `layer-${Date.now()}`;
    const duplicate = {
      ...target,
      id: newId,
      name: `${target.name} (${t('studio_duplicate_layer')})`,
    };
    const updated = [duplicate, ...layers];
    setLayers(updated);
    setActiveLayerId(newId);

    const layerStrokes = strokes
      .filter((s) => s.layerId === layerId)
      .map((s) => ({ ...s, id: Date.now() + Math.random().toString(36).substr(2, 5), layerId: newId }));
    setStrokes((prev) => [...prev, ...layerStrokes]);

    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_layers_update', { roomId: studioRoomId, layers: updated });
    }
  };

  const handleToggleVisibility = (layerId) => {
    const updated = layers.map((l) => (l.id === layerId ? { ...l, visible: !l.visible } : l));
    setLayers(updated);
    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_layers_update', { roomId: studioRoomId, layers: updated });
    }
  };

  const handleToggleLock = (layerId) => {
    const updated = layers.map((l) => (l.id === layerId ? { ...l, locked: !l.locked } : l));
    setLayers(updated);
    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_layers_update', { roomId: studioRoomId, layers: updated });
    }
  };

  const handleUpdateOpacity = (layerId, opacity) => {
    const updated = layers.map((l) => (l.id === layerId ? { ...l, opacity } : l));
    setLayers(updated);
    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_layers_update', { roomId: studioRoomId, layers: updated });
    }
  };

  const handleMoveLayer = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= layers.length) return;
    const updated = [...layers];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setLayers(updated);
    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_layers_update', { roomId: studioRoomId, layers: updated });
    }
  };

  const handleCursorMove = (cursor) => {
    if (socket && isMultiplayer && studioRoomId) {
      socket.emit('studio_cursor_move', { roomId: studioRoomId, cursor });
    }
  };

  const handleImportProject = (projectData) => {
    if (projectData.layers) setLayers(projectData.layers);
    if (projectData.strokes) setStrokes(projectData.strokes);
    if (projectData.layers?.[0]) setActiveLayerId(projectData.layers[0].id);
    setUndoStack([]);
  };

  const handleToggleMultiplayer = () => {
    soundEngine.playClick();
    if (!isMultiplayer) {
      const code = 'STUDIO-' + Math.random().toString(36).substring(2, 7).toUpperCase();
      setStudioRoomId(code);
      setIsMultiplayer(true);
    } else {
      setIsMultiplayer(false);
      setStudioRoomId('');
      setCollaborators([]);
    }
  };

  const handleCopyStudioLink = () => {
    soundEngine.playClick();
    const url = `${window.location.origin}/?studio=${studioRoomId}`;
    navigator.clipboard.writeText(`🎨 DrawItOut Studio:\n${url}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen w-full p-2 md:p-5 bg-[#f7f5f0] text-[#1e242b] flex flex-col space-y-3 relative overflow-x-hidden">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#eaf2eb]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="glass-panel p-3 md:p-4 rounded-3xl flex items-center justify-between border-2 border-[#e5e0d5] bg-white shadow-sm gap-2">
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              onLeave();
            }}
            className="p-2 md:py-2 md:px-3.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-extrabold text-xs transition border border-stone-300 flex items-center space-x-1.5 touch-manipulation active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('back_to_lobby')}</span>
          </button>

          <div className="flex items-center space-x-2.5">
            <img
              src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
              alt="DrawItOut Logo"
              className="h-7 sm:h-8 w-auto object-contain"
            />
            <div className="hidden xs:block border-l border-stone-200 dark:border-stone-700 pl-2">
              <h1 className="text-sm md:text-base font-black text-[#1e242b] dark:text-white tracking-tight">
                {t('studio_title')}
              </h1>
              <span className="text-[10px] md:text-xs text-stone-500 dark:text-stone-400 font-bold">
                {isMultiplayer ? `${t('studio_room_code')}: ${studioRoomId}` : t('studio_solo_mode')}
              </span>
            </div>
          </div>
        </div>

        {/* Middle: Multiplayer Room Toggle & Invite */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleToggleMultiplayer}
            className={`py-2 px-3 rounded-2xl border text-xs font-black transition flex items-center space-x-1.5 touch-manipulation active:scale-95 ${
              isMultiplayer
                ? 'bg-[#eaf2eb] dark:bg-[#1f3323] border-[#386641] dark:border-[#2e5936] text-[#2c5234] dark:text-[#52a061] shadow-xs'
                : 'bg-stone-50 dark:bg-[#1c232d] hover:bg-stone-100 dark:hover:bg-[#252f3d] border-stone-200 dark:border-[#333e4d] text-stone-700 dark:text-stone-300'
            }`}
          >
            <Users className="w-4 h-4 text-[#386641] dark:text-[#52a061]" />
            <span className="hidden sm:inline">
              {isMultiplayer ? t('studio_multiplayer_title') : t('studio_open_collab')}
            </span>
          </button>

          {isMultiplayer && (
            <button
              type="button"
              onClick={handleCopyStudioLink}
              className="p-2 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white text-xs font-extrabold shadow-xs transition flex items-center space-x-1 touch-manipulation"
              title={t('studio_invite_btn')}
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#eaf2eb]" /> : <Copy className="w-4 h-4" />}
              <span className="hidden md:inline">{copiedLink ? t('studio_invite_copied') : t('studio_invite_btn')}</span>
            </button>
          )}
        </div>

        {/* Right: Theme, Language & Layer Toggle */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setShowLayersPanel(!showLayersPanel)}
            className={`p-2 rounded-2xl border text-xs font-bold transition flex items-center space-x-1 touch-manipulation ${
              showLayersPanel ? 'bg-[#eaf2eb] dark:bg-[#1f3323] border-[#386641] dark:border-[#2e5936] text-[#2c5234] dark:text-[#52a061]' : 'bg-stone-50 dark:bg-[#1c232d] border-stone-200 dark:border-[#333e4d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('studio_layers')}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden md:inline">{t('studio_layers')}</span>
          </button>

          <ThemeToggle />

          <LanguageSelector />
        </div>
      </div>

      {/* Main Studio Workspace */}
      <div className="flex-1 flex flex-col space-y-3">
        <StudioToolbar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          strokeOpacity={strokeOpacity}
          setStrokeOpacity={setStrokeOpacity}
          stabilizer={stabilizer}
          setStabilizer={setStabilizer}
          usePressure={usePressure}
          setUsePressure={setUsePressure}
          symmetryMode={symmetryMode}
          setSymmetryMode={setSymmetryMode}
          activeShape={activeShape}
          setActiveShape={setActiveShape}
          gridMode={gridMode}
          setGridMode={setGridMode}
          onUndo={handleUndo}
          onRedo={handleRedo}
          canUndo={strokes.length > 0}
          canRedo={undoStack.length > 0}
          onClearAll={handleClearAll}
          onOpenTimelapse={() => setShowTimelapseModal(true)}
          onOpenExport={() => setShowExportModal(true)}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 items-start flex-1">
          <div className={showLayersPanel ? 'lg:col-span-9' : 'lg:col-span-12'}>
            <StudioCanvas
              layers={layers}
              activeLayerId={activeLayerId}
              activeTool={activeTool}
              currentColor={currentColor}
              strokeWidth={strokeWidth}
              strokeOpacity={strokeOpacity}
              stabilizer={stabilizer}
              usePressure={usePressure}
              symmetryMode={symmetryMode}
              activeShape={activeShape}
              gridMode={gridMode}
              strokes={strokes}
              onAddStroke={handleAddStroke}
              onEyedropperPick={(col) => {
                setCurrentColor(col);
                setActiveTool('pen');
              }}
              multiplayerCursors={collaborators}
              onCursorMove={handleCursorMove}
            />
          </div>

          {showLayersPanel && (
            <div className="lg:col-span-3 w-full animate-fade-in">
              <StudioLayers
                layers={layers}
                activeLayerId={activeLayerId}
                onSelectLayer={setActiveLayerId}
                onAddLayer={handleAddLayer}
                onDeleteLayer={handleDeleteLayer}
                onDuplicateLayer={handleDuplicateLayer}
                onToggleVisibility={handleToggleVisibility}
                onToggleLock={handleToggleLock}
                onUpdateOpacity={handleUpdateOpacity}
                onMoveLayer={handleMoveLayer}
              />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showTimelapseModal && (
        <TimelapseModal
          strokes={strokes}
          layers={layers}
          onClose={() => setShowTimelapseModal(false)}
        />
      )}

      {showExportModal && (
        <StudioExportModal
          layers={layers}
          strokes={strokes}
          onImportProject={handleImportProject}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
