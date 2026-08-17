import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Layers,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  ChevronUp,
  ChevronDown,
  Sliders,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function StudioLayers({
  layers = [],
  activeLayerId,
  onSelectLayer,
  onAddLayer,
  onDeleteLayer,
  onDuplicateLayer,
  onToggleVisibility,
  onToggleLock,
  onUpdateOpacity,
  onMoveLayer,
}) {
  const { t } = useLanguage();

  return (
    <div className="w-full glass-panel rounded-3xl p-4 bg-white border-2 border-[#e5e0d5] shadow-md flex flex-col space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-[#386641]" />
          <h3 className="text-xs font-black text-[#1e242b] uppercase tracking-wider">
            {t('studio_layers')} ({layers.length}/5)
          </h3>
        </div>

        <button
          type="button"
          disabled={layers.length >= 5}
          onClick={() => {
            soundEngine.playClick();
            onAddLayer();
          }}
          className="p-1.5 rounded-xl bg-[#eaf2eb] hover:bg-[#c7decb] text-[#2c5234] transition disabled:opacity-40 flex items-center space-x-1 text-[11px] font-extrabold shadow-2xs touch-manipulation active:scale-95"
          title={t('studio_add_layer')}
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{t('studio_add_layer')}</span>
        </button>
      </div>

      {/* Layer List */}
      <div className="flex flex-col space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
        {layers.map((layer, index) => {
          const isActive = layer.id === activeLayerId;

          return (
            <div
              key={layer.id}
              onClick={() => onSelectLayer(layer.id)}
              className={`p-2.5 rounded-2xl border-2 transition flex flex-col space-y-2 cursor-pointer touch-manipulation ${
                isActive
                  ? 'bg-[#eaf2eb] border-[#386641] shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100/80 border-stone-200'
              }`}
            >
              {/* Top Row: Eye, Lock, Name, Actions */}
              <div className="flex items-center justify-between gap-1.5">
                <div className="flex items-center space-x-1.5 flex-1 min-w-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playClick();
                      onToggleVisibility(layer.id);
                    }}
                    className={`p-1 rounded-lg transition ${
                      layer.visible ? 'text-stone-700 hover:text-black' : 'text-stone-300'
                    }`}
                    title={t('studio_layers')}
                  >
                    {layer.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playClick();
                      onToggleLock(layer.id);
                    }}
                    className={`p-1 rounded-lg transition ${
                      layer.locked ? 'text-[#c86d3b]' : 'text-stone-300 hover:text-stone-600'
                    }`}
                    title={t('studio_pressure')}
                  >
                    {layer.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>

                  <span
                    className={`text-xs font-bold truncate ${
                      isActive ? 'text-[#2c5234]' : 'text-stone-700'
                    }`}
                  >
                    {layer.name}
                  </span>
                </div>

                <div className="flex items-center space-x-0.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveLayer(index, index - 1);
                    }}
                    className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={index === layers.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoveLayer(index, index + 1);
                    }}
                    className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    disabled={layers.length >= 5}
                    onClick={(e) => {
                      e.stopPropagation();
                      soundEngine.playClick();
                      onDuplicateLayer(layer.id);
                    }}
                    className="p-1 text-stone-400 hover:text-stone-800 disabled:opacity-20"
                    title={t('studio_duplicate_layer')}
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {layers.length > 1 && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundEngine.playClick();
                        onDeleteLayer(layer.id);
                      }}
                      className="p-1 text-rose-400 hover:text-rose-600"
                      title={t('studio_delete_layer')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Opacity Slider for Active Layer */}
              {isActive && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center space-x-2 pt-1 border-t border-[#c7decb]/60"
                >
                  <Sliders className="w-3 h-3 text-[#386641]" />
                  <input
                    type="range"
                    min="0.05"
                    max="1"
                    step="0.05"
                    value={layer.opacity !== undefined ? layer.opacity : 1}
                    onChange={(e) => onUpdateOpacity(layer.id, parseFloat(e.target.value))}
                    className="flex-1 accent-[#386641] h-1.5 bg-stone-200 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-black text-[#2c5234] w-7 text-right">
                    {Math.round((layer.opacity !== undefined ? layer.opacity : 1) * 100)}%
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
