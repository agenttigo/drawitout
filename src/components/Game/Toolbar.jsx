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
    <div className="w-full glass-panel rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3 border border-[#e5e0d5] shadow-sm bg-white text-[#1e242b] animate-fade-in">
      {/* Tools Picker */}
      <div className="flex items-center space-x-1.5">
        <button
          onClick={() => handleToolSelect('pen')}
          className={`p-2 rounded-xl transition ${
            activeTool === 'pen'
              ? 'bg-[#386641] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={t('tool_pen')}
        >
          <Pencil className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleToolSelect('highlighter')}
          className={`p-2 rounded-xl transition ${
            activeTool === 'highlighter'
              ? 'bg-[#386641] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={t('tool_highlighter')}
        >
          <Highlighter className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleToolSelect('eraser')}
          className={`p-2 rounded-xl transition ${
            activeTool === 'eraser'
              ? 'bg-[#386641] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={t('tool_eraser')}
        >
          <Eraser className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleToolSelect('fill')}
          className={`p-2 rounded-xl transition ${
            activeTool === 'fill'
              ? 'bg-[#386641] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={t('tool_fill')}
        >
          <PaintBucket className="w-4 h-4" />
        </button>

        <div className="h-6 w-px bg-stone-200 mx-1" />

        {/* Shapes */}
        <button
          onClick={() => handleToolSelect('line')}
          className={`p-2 rounded-xl transition ${
            activeTool === 'line'
              ? 'bg-[#386641] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={t('tool_line')}
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleToolSelect('circle')}
          className={`p-2 rounded-xl transition ${
            activeTool === 'circle'
              ? 'bg-[#386641] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={t('tool_circle')}
        >
          <Circle className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleToolSelect('rectangle')}
          className={`p-2 rounded-xl transition ${
            activeTool === 'rectangle'
              ? 'bg-[#386641] text-white shadow-xs'
              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
          }`}
          title={t('tool_rectangle')}
        >
          <Square className="w-4 h-4" />
        </button>
      </div>

      {/* Color Swatches */}
      <div className="flex items-center space-x-1.5">
        <div className="flex flex-wrap gap-1 max-w-[210px]">
          {COLOR_SWATCHES.map((color) => (
            <button
              key={color}
              onClick={() => handleColorSelect(color)}
              className={`w-5 h-5 rounded-full transition-transform ${
                currentColor === color ? 'scale-125 ring-2 ring-[#386641] shadow-xs' : 'hover:scale-110 opacity-90'
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <input
          type="color"
          value={currentColor}
          onChange={(e) => handleColorSelect(e.target.value)}
          className="w-7 h-7 rounded-lg cursor-pointer border-0 bg-transparent"
        />
      </div>

      {/* Stroke Size Slider */}
      <div className="flex items-center space-x-2">
        <input
          type="range"
          min="2"
          max="36"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
          className="w-20 accent-[#386641]"
        />
        <span className="text-xs font-bold text-stone-600 w-5">{strokeWidth}px</span>
      </div>

      {/* Theme & Particle FX Selectors */}
      <div className="flex items-center space-x-2">
        <select
          value={canvasTheme}
          onChange={(e) => setCanvasTheme(e.target.value)}
          className="bg-stone-50 border border-stone-200 rounded-xl px-2 py-1.5 text-xs font-bold text-stone-800"
        >
          <option value="white">🤍 {t('theme_white')}</option>
          <option value="blackboard">🏫 {t('theme_blackboard')}</option>
          <option value="graph">📐 {t('theme_graph')}</option>
          <option value="blueprint">🔵 {t('theme_blueprint')}</option>
        </select>

        <select
          value={particleFx}
          onChange={(e) => setParticleFx(e.target.value)}
          className="bg-stone-50 border border-stone-200 rounded-xl px-2 py-1.5 text-xs font-bold text-stone-800"
        >
          <option value="none">✏️ {t('fx_none')}</option>
          <option value="stars">✨ {t('fx_stars')}</option>
          <option value="rainbow">🌈 {t('fx_rainbow')}</option>
        </select>
      </div>

      {/* Super Hint Powerup, Undo, Clear & Download Buttons */}
      <div className="flex items-center space-x-1.5">
        {onRequestSuperHint && (
          <button
            onClick={() => { soundEngine.playClick(); onRequestSuperHint(); }}
            className="p-2 rounded-xl bg-[#fff8eb] hover:bg-[#fdeecb] text-[#9c6615] transition border border-[#f5e3bc] font-bold text-xs flex items-center space-x-1"
            title={t('powerup_super_hint')}
          >
            <Lightbulb className="w-4 h-4 text-[#c86d3b] fill-current" />
          </button>
        )}

        <button
          onClick={onUndo}
          className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition"
          title={t('undo_stroke')}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={onClear}
          className="p-2 rounded-xl bg-[#fdf0f0] hover:bg-[#fce1e1] text-[#b93838] transition border border-[#f4c2c2]"
          title={t('clear_canvas')}
        >
          <Trash2 className="w-4 h-4" />
        </button>

        <button
          onClick={onDownload}
          className="p-2 rounded-xl bg-[#eaf2eb] hover:bg-[#deede0] text-[#2c5234] transition border border-[#c7decb]"
          title={t('download_png')}
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
