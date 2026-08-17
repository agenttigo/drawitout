import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Pencil,
  PenTool,
  Paintbrush,
  SprayCan,
  Sparkles,
  Eraser,
  PaintBucket,
  Pipette,
  Undo,
  Redo,
  Trash2,
  Film,
  Download,
  Grid,
  Divide,
  Square,
  Compass,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

const STUDIO_COLOR_PALETTE = [
  '#000000', '#374151', '#6b7280', '#9ca3af', '#ffffff',
  '#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d',
  '#16a34a', '#0d9488', '#0284c7', '#2563eb', '#4f46e5',
  '#7c3aed', '#9333ea', '#c026d3', '#db2777', '#e11d48',
  '#78350f', '#92400e', '#b45309', '#fef08a', '#bbf7d0',
];

export function StudioToolbar({
  activeTool,
  setActiveTool,
  currentColor,
  setCurrentColor,
  strokeWidth,
  setStrokeWidth,
  strokeOpacity,
  setStrokeOpacity,
  stabilizer,
  setStabilizer,
  usePressure,
  setUsePressure,
  symmetryMode,
  setSymmetryMode,
  activeShape,
  setActiveShape,
  gridMode,
  setGridMode,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onClearAll,
  onOpenTimelapse,
  onOpenExport,
}) {
  const { t } = useLanguage();
  const [showSymmetryMenu, setShowSymmetryMenu] = useState(false);
  const [showShapesMenu, setShowShapesMenu] = useState(false);

  const BRUSH_TOOLS = [
    { id: 'pencil', icon: Pencil, label: t('studio_brush_pencil') },
    { id: 'pen', icon: PenTool, label: t('studio_brush_pen') },
    { id: 'watercolor', icon: Paintbrush, label: t('studio_brush_watercolor') },
    { id: 'airbrush', icon: SprayCan, label: t('studio_brush_airbrush') },
    { id: 'neon', icon: Sparkles, label: t('studio_brush_neon') },
    { id: 'calligraphy', icon: Compass, label: t('studio_brush_calligraphy') },
    { id: 'eraser', icon: Eraser, label: t('studio_brush_eraser') },
    { id: 'fill', icon: PaintBucket, label: t('studio_brush_fill') },
    { id: 'eyedropper', icon: Pipette, label: t('studio_brush_eyedropper') },
  ];

  return (
    <div className="w-full glass-panel rounded-3xl p-3 md:p-4 bg-white dark:bg-[#161b22] border-2 border-[#e5e0d5] dark:border-[#333e4d] shadow-md flex flex-wrap items-center justify-between gap-3">
      {/* 1. Brush Tool Selector */}
      <div className="flex items-center space-x-1 overflow-x-auto max-w-full pb-1 sm:pb-0 custom-scrollbar">
        {BRUSH_TOOLS.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id && activeShape === 'none';

          return (
            <button
              key={tool.id}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setActiveTool(tool.id);
                setActiveShape('none');
              }}
              className={`p-2 sm:p-2.5 rounded-2xl transition flex items-center justify-center space-x-1.5 touch-manipulation active:scale-95 ${
                isActive
                  ? 'bg-[#386641] text-white shadow-xs scale-105'
                  : 'bg-stone-50 dark:bg-[#1c232d] hover:bg-stone-100 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-[#333e4d]'
              }`}
              title={tool.label}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden lg:inline text-xs font-bold">{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* 2. Sliders (Size, Opacity, Stabilizer, Pressure) */}
      <div className="flex items-center space-x-3 bg-stone-50 p-2 rounded-2xl border border-stone-200 text-xs font-bold">
        {/* Brush Size */}
        <div className="flex items-center space-x-1.5">
          <span className="text-stone-500 text-[11px]">{t('studio_size')}:</span>
          <input
            type="range"
            min="1"
            max="60"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value, 10))}
            className="w-16 sm:w-20 accent-[#386641] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-[#2c5234] font-black w-6">{strokeWidth}px</span>
        </div>

        {/* Opacity */}
        <div className="hidden sm:flex items-center space-x-1.5 border-l border-stone-300 pl-3">
          <span className="text-stone-500 text-[11px]">{t('studio_opacity')}:</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={strokeOpacity}
            onChange={(e) => setStrokeOpacity(parseFloat(e.target.value))}
            className="w-16 accent-[#386641] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
          />
          <span className="text-[11px] text-[#2c5234] font-black w-7">{Math.round(strokeOpacity * 100)}%</span>
        </div>

        {/* Stabilizer Toggle */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setStabilizer((prev) => (prev > 0 ? 0 : 0.6));
          }}
          className={`px-2 py-1 rounded-xl text-[10px] font-black transition border ${
            stabilizer > 0
              ? 'bg-[#eaf2eb] text-[#2c5234] border-[#c7decb]'
              : 'bg-white text-stone-500 border-stone-200'
          }`}
          title={t('studio_stabilizer')}
        >
          ✨ {t('studio_stabilizer')}: {stabilizer > 0 ? t('studio_on') : t('studio_off')}
        </button>

        {/* Pressure Toggle */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setUsePressure((prev) => !prev);
          }}
          className={`hidden md:block px-2 py-1 rounded-xl text-[10px] font-black transition border ${
            usePressure
              ? 'bg-[#eaf2eb] text-[#2c5234] border-[#c7decb]'
              : 'bg-white text-stone-500 border-stone-200'
          }`}
          title={t('studio_pressure')}
        >
          ✍️ {t('studio_pressure')}: {usePressure ? t('studio_on') : t('studio_off')}
        </button>
      </div>

      {/* 3. Symmetry & Shapes & Grid Menus */}
      <div className="flex items-center space-x-1.5">
        {/* Symmetry Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowSymmetryMenu(!showSymmetryMenu)}
            className={`p-2 rounded-2xl border text-xs font-bold flex items-center space-x-1 transition touch-manipulation ${
              symmetryMode !== 'none'
                ? 'bg-[#eaf2eb] border-[#386641] text-[#2c5234]'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
            title={t('studio_symmetry')}
          >
            <Divide className="w-4 h-4 text-[#386641]" />
            <span className="hidden sm:inline">{t('studio_symmetry')}</span>
          </button>

          {showSymmetryMenu && (
            <div className="absolute top-full mt-2 left-0 z-40 bg-white border border-[#e5e0d5] rounded-2xl shadow-xl p-2 w-48 space-y-1 animate-fade-in">
              <button
                type="button"
                onClick={() => { setSymmetryMode('none'); setShowSymmetryMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  symmetryMode === 'none' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                ❌ {t('studio_sym_none')}
              </button>
              <button
                type="button"
                onClick={() => { setSymmetryMode('vertical'); setShowSymmetryMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  symmetryMode === 'vertical' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                🪞 {t('studio_sym_vertical')}
              </button>
              <button
                type="button"
                onClick={() => { setSymmetryMode('horizontal'); setShowSymmetryMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  symmetryMode === 'horizontal' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                🌊 {t('studio_sym_horizontal')}
              </button>
              <button
                type="button"
                onClick={() => { setSymmetryMode('radial4'); setShowSymmetryMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  symmetryMode === 'radial4' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                ☸️ {t('studio_sym_radial4')}
              </button>
              <button
                type="button"
                onClick={() => { setSymmetryMode('radial8'); setShowSymmetryMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  symmetryMode === 'radial8' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                💮 {t('studio_sym_radial8')}
              </button>
            </div>
          )}
        </div>

        {/* Shapes Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowShapesMenu(!showShapesMenu)}
            className={`p-2 rounded-2xl border text-xs font-bold flex items-center space-x-1 transition touch-manipulation ${
              activeShape !== 'none'
                ? 'bg-[#eaf2eb] border-[#386641] text-[#2c5234]'
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}
            title={t('studio_shapes')}
          >
            <Square className="w-4 h-4 text-[#386641]" />
            <span className="hidden sm:inline">{t('studio_shapes')}</span>
          </button>

          {showShapesMenu && (
            <div className="absolute top-full mt-2 left-0 z-40 bg-white border border-[#e5e0d5] rounded-2xl shadow-xl p-2 w-48 space-y-1 animate-fade-in">
              <button
                type="button"
                onClick={() => { setActiveShape('none'); setShowShapesMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  activeShape === 'none' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                ✏️ {t('studio_freehand')}
              </button>
              <button
                type="button"
                onClick={() => { setActiveShape('line'); setShowShapesMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  activeShape === 'line' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                📏 {t('studio_shape_line')}
              </button>
              <button
                type="button"
                onClick={() => { setActiveShape('rect'); setShowShapesMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  activeShape === 'rect' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                ⬛ {t('studio_shape_rect')}
              </button>
              <button
                type="button"
                onClick={() => { setActiveShape('circle'); setShowShapesMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  activeShape === 'circle' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                ⚪ {t('studio_shape_circle')}
              </button>
              <button
                type="button"
                onClick={() => { setActiveShape('star'); setShowShapesMenu(false); }}
                className={`w-full text-left px-3 py-1.5 text-xs font-bold rounded-xl ${
                  activeShape === 'star' ? 'bg-[#eaf2eb] text-[#2c5234]' : 'hover:bg-stone-50'
                }`}
              >
                ⭐ {t('studio_shape_star')}
              </button>
            </div>
          )}
        </div>

        {/* Grid Toggle */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            setGridMode((prev) => (prev === 'none' ? 'square' : prev === 'square' ? 'isometric' : 'none'));
          }}
          className={`p-2 rounded-2xl border text-xs font-bold flex items-center space-x-1 transition touch-manipulation ${
            gridMode !== 'none'
              ? 'bg-[#eaf2eb] border-[#386641] text-[#2c5234]'
              : 'bg-stone-50 border-stone-200 text-stone-700'
          }`}
          title={t('studio_grid')}
        >
          <Grid className="w-4 h-4 text-[#386641]" />
          <span className="hidden md:inline">
            {gridMode === 'none'
              ? t('studio_grid_none')
              : gridMode === 'square'
              ? t('studio_grid_square')
              : t('studio_grid_isometric')}
          </span>
        </button>
      </div>

      {/* 4. Color Palette & Eyedropper */}
      <div className="flex items-center space-x-2">
        <div className="relative flex items-center space-x-1.5">
          <input
            type="color"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="w-8 h-8 rounded-full cursor-pointer border-2 border-stone-300 shadow-xs p-0 overflow-hidden"
            title={t('studio_brush_eyedropper')}
          />
          <input
            type="text"
            value={currentColor}
            onChange={(e) => setCurrentColor(e.target.value)}
            className="w-16 px-1.5 py-1 text-[11px] font-mono font-bold bg-stone-100 rounded-lg border border-stone-200 uppercase text-stone-700"
          />
        </div>

        {/* Quick Swatches */}
        <div className="hidden xl:flex items-center space-x-1 max-w-[200px] overflow-x-auto custom-scrollbar">
          {STUDIO_COLOR_PALETTE.slice(0, 12).map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => setCurrentColor(col)}
              style={{ backgroundColor: col }}
              className={`w-5 h-5 rounded-full border transition-transform hover:scale-125 ${
                currentColor.toLowerCase() === col.toLowerCase()
                  ? 'ring-2 ring-[#386641] scale-110'
                  : 'border-stone-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 5. Actions */}
      <div className="flex items-center space-x-1.5">
        <button
          type="button"
          disabled={!canUndo}
          onClick={() => { soundEngine.playClick(); onUndo(); }}
          className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 transition disabled:opacity-30 touch-manipulation active:scale-95"
          title="Ctrl+Z"
        >
          <Undo className="w-4 h-4" />
        </button>

        <button
          type="button"
          disabled={!canRedo}
          onClick={() => { soundEngine.playClick(); onRedo(); }}
          className="p-2 rounded-xl bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200 transition disabled:opacity-30 touch-manipulation active:scale-95"
          title="Ctrl+Y"
        >
          <Redo className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => { soundEngine.playClick(); onClearAll(); }}
          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 transition touch-manipulation active:scale-95"
          title={t('studio_clear_confirm')}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => { soundEngine.playClick(); onOpenTimelapse(); }}
          className="py-2 px-3.5 rounded-2xl bg-[#eaf2eb] hover:bg-[#c7decb] text-[#2c5234] border border-[#c7decb] font-black text-xs transition flex items-center space-x-1.5 shadow-2xs touch-manipulation active:scale-95"
          title={t('studio_timelapse_title')}
        >
          <Film className="w-4 h-4 text-[#386641]" />
          <span>{t('studio_timelapse_btn')}</span>
        </button>

        <button
          type="button"
          onClick={() => { soundEngine.playClick(); onOpenExport(); }}
          className="py-2 px-3.5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-black text-xs transition flex items-center space-x-1.5 shadow-md touch-manipulation active:scale-95"
          title={t('studio_export_title')}
        >
          <Download className="w-4 h-4" />
          <span>{t('studio_export_btn')}</span>
        </button>
      </div>
    </div>
  );
}
