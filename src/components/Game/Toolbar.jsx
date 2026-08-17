import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Pencil,
  Highlighter,
  Eraser,
  PaintBucket,
  Minus,
  Circle,
  Square,
  Sparkles,
  RotateCcw,
  Trash2,
  Download,
  Palette,
  Lightbulb,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

const COLOR_SWATCHES = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#f59e0b',
  '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6',
  '#ec4899', '#78350f', '#94a3b8', '#334155',
];

export function Toolbar({
  activeTool,
  setActiveTool,
  currentColor = '#000000',
  setCurrentColor,
  strokeWidth,
  setStrokeWidth,
  canvasTheme,
  setCanvasTheme,
  particleFx,
  setParticleFx,
  onClear,
  onUndo,
  onDownload,
  onRequestSuperHint,
}) {
  const { t } = useLanguage();

  const handleToolSelect = (tool) => {
    soundEngine.playClick();
    setActiveTool(tool);
  };

  const handleColorSelect = (color) => {
    soundEngine.playClick();
    setCurrentColor(color);
  };

  return (
    <div className="w-full glass-panel rounded-2xl p-2 md:p-3 flex flex-col md:flex-row items-center justify-between gap-2.5 border border-[#e5e0d5] dark:border-[#333e4d] shadow-sm bg-white dark:bg-[#161b22] text-[#1e242b] dark:text-[#f1f5f9] animate-fade-in select-none">
      {/* Top Row on Mobile: Tools, Shapes, Undo, Clear */}
      <div className="w-full md:w-auto flex items-center justify-between md:justify-start space-x-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
        {/* Drawing Tools */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleToolSelect('pen')}
            className={`p-2.5 md:p-2 rounded-xl transition touch-manipulation ${
              activeTool === 'pen'
                ? 'bg-[#386641] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('tool_pen')}
          >
            <Pencil className="w-4 h-4 md:w-4 md:h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleToolSelect('highlighter')}
            className={`p-2.5 md:p-2 rounded-xl transition touch-manipulation ${
              activeTool === 'highlighter'
                ? 'bg-[#386641] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('tool_highlighter')}
          >
            <Highlighter className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleToolSelect('eraser')}
            className={`p-2.5 md:p-2 rounded-xl transition touch-manipulation ${
              activeTool === 'eraser'
                ? 'bg-[#386641] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('tool_eraser')}
          >
            <Eraser className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleToolSelect('fill')}
            className={`p-2.5 md:p-2 rounded-xl transition touch-manipulation ${
              activeTool === 'fill'
                ? 'bg-[#386641] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('tool_fill')}
          >
            <PaintBucket className="w-4 h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-stone-200 dark:bg-[#333e4d] mx-0.5 md:mx-1 flex-shrink-0" />

        {/* Shapes */}
        <div className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => handleToolSelect('line')}
            className={`p-2.5 md:p-2 rounded-xl transition touch-manipulation ${
              activeTool === 'line'
                ? 'bg-[#386641] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('tool_line')}
          >
            <Minus className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleToolSelect('circle')}
            className={`p-2.5 md:p-2 rounded-xl transition touch-manipulation ${
              activeTool === 'circle'
                ? 'bg-[#386641] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('tool_circle')}
          >
            <Circle className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleToolSelect('rectangle')}
            className={`p-2.5 md:p-2 rounded-xl transition touch-manipulation ${
              activeTool === 'rectangle'
                ? 'bg-[#386641] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300'
            }`}
            title={t('tool_rectangle')}
          >
            <Square className="w-4 h-4" />
          </button>
        </div>

        <div className="h-6 w-px bg-stone-200 dark:bg-[#333e4d] mx-0.5 md:mx-1 flex-shrink-0" />

        {/* Action buttons (Undo, Clear, SuperHint, Download) */}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {onRequestSuperHint && (
            <button
              type="button"
              onClick={() => { soundEngine.playClick(); onRequestSuperHint(); }}
              className="p-2.5 md:p-2 rounded-xl bg-[#fff8eb] dark:bg-[#3d2c1e] hover:bg-[#fdeecb] text-[#9c6615] dark:text-[#fcd34d] transition border border-[#f5e3bc] dark:border-[#784f1a] font-bold text-xs flex items-center space-x-1 touch-manipulation"
              title={t('powerup_super_hint')}
            >
              <Lightbulb className="w-4 h-4 text-[#c86d3b] dark:text-[#ea7a3e] fill-current" />
            </button>
          )}

          <button
            type="button"
            onClick={onUndo}
            className="p-2.5 md:p-2 rounded-xl bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-700 dark:text-stone-300 transition border border-stone-200 dark:border-[#333e4d] touch-manipulation active:scale-95"
            title={t('undo_stroke')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onClear}
            className="p-2.5 md:p-2 rounded-xl bg-[#fdf0f0] dark:bg-[#3d1a1a] hover:bg-[#fce1e1] text-[#b93838] dark:text-[#fca5a5] transition border border-[#f4c2c2] dark:border-[#7a2e2e] touch-manipulation active:scale-95"
            title={t('clear_canvas')}
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onDownload}
            className="p-2.5 md:p-2 rounded-xl bg-[#eaf2eb] dark:bg-[#1f3323] hover:bg-[#deede0] text-[#2c5234] dark:text-[#6ee7b7] transition border border-[#c7decb] dark:border-[#2e5936] touch-manipulation active:scale-95"
            title={t('download_png')}
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Row on Mobile / Right Section on Desktop: Color Swatches & Stroke Width */}
      <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 overflow-x-auto pt-1 md:pt-0 custom-scrollbar">
        {/* Color Swatches */}
        <div className="flex items-center space-x-1.5 flex-shrink-0">
          <div className="flex items-center gap-1.5 max-w-[260px] md:max-w-[210px] overflow-x-auto py-1 custom-scrollbar">
            {COLOR_SWATCHES.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={`w-6 h-6 md:w-5 md:h-5 rounded-full transition-transform touch-manipulation flex-shrink-0 border border-stone-300 dark:border-stone-600 ${
                  currentColor === color ? 'scale-125 ring-2 ring-[#386641] dark:ring-[#52a061] shadow-xs' : 'hover:scale-110 opacity-90'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          <input
            type="color"
            value={currentColor}
            onChange={(e) => handleColorSelect(e.target.value)}
            className="w-7 h-7 md:w-7 md:h-7 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0"
          />
        </div>

        {/* Stroke Size Slider */}
        <div className="flex items-center space-x-1.5 flex-shrink-0 bg-stone-50 dark:bg-[#1c232d] px-2 py-1 rounded-xl border border-stone-200 dark:border-[#333e4d]">
          <input
            type="range"
            min="2"
            max="36"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            className="w-16 md:w-20 accent-[#386641] dark:accent-[#52a061]"
          />
          <span className="text-[11px] md:text-xs font-bold text-stone-600 dark:text-stone-300 w-5">{strokeWidth}px</span>
        </div>

        {/* Theme & Particle FX Selectors (Hidden on very small screens, visible on md+) */}
        <div className="hidden lg:flex items-center space-x-2 flex-shrink-0">
          <select
            value={canvasTheme}
            onChange={(e) => setCanvasTheme(e.target.value)}
            className="bg-stone-50 dark:bg-[#1c232d] border border-stone-200 dark:border-[#333e4d] rounded-xl px-2 py-1.5 text-xs font-bold text-stone-800 dark:text-stone-200"
          >
            <option value="white">🤍 {t('theme_white')}</option>
            <option value="blackboard">🏫 {t('theme_blackboard')}</option>
            <option value="graph">📐 {t('theme_graph')}</option>
            <option value="blueprint">🔵 {t('theme_blueprint')}</option>
          </select>

          <select
            value={particleFx}
            onChange={(e) => setParticleFx(e.target.value)}
            className="bg-stone-50 dark:bg-[#1c232d] border border-stone-200 dark:border-[#333e4d] rounded-xl px-2 py-1.5 text-xs font-bold text-stone-800 dark:text-stone-200"
          >
            <option value="none">✏️ {t('fx_none')}</option>
            <option value="stars">✨ {t('fx_stars')}</option>
            <option value="rainbow">🌈 {t('fx_rainbow')}</option>
          </select>
        </div>
      </div>
    </div>
  );
}
