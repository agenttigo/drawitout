import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Download,
  Upload,
  FileImage,
  FileCode,
  X,
  CheckCircle,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function StudioExportModal({
  layers = [],
  strokes = [],
  width = 1200,
  height = 900,
  onImportProject,
  onClose,
}) {
  const { t } = useLanguage();
  const fileInputRef = useRef(null);

  const [resolutionScale, setResolutionScale] = useState(1);
  const [downloadSuccess, setDownloadSuccess] = useState('');

  const floodFill = (ctx, startX, startY, fillColor, curWidth, curHeight) => {
    if (!ctx || startX < 0 || startY < 0 || startX >= curWidth || startY >= curHeight) return;

    const imgData = ctx.getImageData(0, 0, curWidth, curHeight);
    const data = imgData.data;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = fillColor;
    tempCtx.fillRect(0, 0, 1, 1);
    const fillRgba = tempCtx.getImageData(0, 0, 1, 1).data;

    const startIdx = (startY * curWidth + startX) * 4;
    const targetR = data[startIdx];
    const targetG = data[startIdx + 1];
    const targetB = data[startIdx + 2];
    const targetA = data[startIdx + 3];

    if (
      Math.abs(targetR - fillRgba[0]) < 8 &&
      Math.abs(targetG - fillRgba[1]) < 8 &&
      Math.abs(targetB - fillRgba[2]) < 8 &&
      Math.abs(targetA - fillRgba[3]) < 8
    ) {
      return;
    }

    const tolerance = 42;
    const matchesTarget = (idx) => {
      return (
        Math.abs(data[idx] - targetR) <= tolerance &&
        Math.abs(data[idx + 1] - targetG) <= tolerance &&
        Math.abs(data[idx + 2] - targetB) <= tolerance &&
        Math.abs(data[idx + 3] - targetA) <= tolerance
      );
    };

    const pixelStack = [[startX, startY]];
    const visited = new Uint8Array(curWidth * curHeight);

    while (pixelStack.length > 0) {
      const [curX, curY] = pixelStack.pop();
      const pixelPos = curY * curWidth + curX;
      const idx = pixelPos * 4;

      if (visited[pixelPos]) continue;
      visited[pixelPos] = 1;

      if (!matchesTarget(idx)) continue;

      data[idx] = fillRgba[0];
      data[idx + 1] = fillRgba[1];
      data[idx + 2] = fillRgba[2];
      data[idx + 3] = 255;

      if (curX > 0 && !visited[pixelPos - 1]) pixelStack.push([curX - 1, curY]);
      if (curX < curWidth - 1 && !visited[pixelPos + 1]) pixelStack.push([curX + 1, curY]);
      if (curY > 0 && !visited[pixelPos - curWidth]) pixelStack.push([curX, curY - 1]);
      if (curY < curHeight - 1 && !visited[pixelPos + curWidth]) pixelStack.push([curX, curY + 1]);
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const createCompositeCanvas = (isTransparent = false, scale = 1) => {
    const targetW = width * scale;
    const targetH = height * scale;

    const offCanvas = document.createElement('canvas');
    offCanvas.width = targetW;
    offCanvas.height = targetH;
    const ctx = offCanvas.getContext('2d');

    if (!isTransparent) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, targetW, targetH);
    }

    layers.forEach((layer) => {
      if (!layer.visible) return;
      ctx.save();
      ctx.globalAlpha = layer.opacity !== undefined ? layer.opacity : 1;

      strokes
        .filter((s) => s.layerId === layer.id || (!s.layerId && layer.id === layers[0]?.id))
        .forEach((s) => {
          drawExportStroke(ctx, s, scale, targetW, targetH);
        });

      ctx.restore();
    });

    return offCanvas;
  };

  const drawExportStroke = (ctx, stroke, scale = 1, curW, curH) => {
    const { tool, color, width: sWidth, opacity = 1, points, shape, x, y } = stroke;

    if (tool === 'fill') {
      const fillX = Math.round((x !== undefined ? x : points?.[0]?.x) * scale);
      const fillY = Math.round((y !== undefined ? y : points?.[0]?.y) * scale);
      floodFill(ctx, fillX, fillY, color, curW, curH);
      return;
    }

    if (!points || points.length === 0) return;

    const scaledPoints = points.map((p) => ({
      x: p.x * scale,
      y: p.y * scale,
      pressure: p.pressure,
    }));
    const scaledWidth = sWidth * scale;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = opacity;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = scaledWidth * 1.5;
    } else if (tool === 'neon') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = scaledWidth * 2.5;
      ctx.lineWidth = scaledWidth;
    } else if (tool === 'airbrush') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = scaledWidth * 2;
      ctx.globalAlpha = opacity * 0.35;
      ctx.lineWidth = scaledWidth * 1.5;
    } else if (tool === 'watercolor') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity * 0.25;
      ctx.lineWidth = scaledWidth * 1.4;
    } else if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity * 0.75;
      ctx.lineWidth = Math.max(1, scaledWidth * 0.8);
    } else if (tool === 'calligraphy') {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = scaledWidth;
    }

    if (shape === 'line' && scaledPoints.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
      ctx.lineTo(scaledPoints[scaledPoints.length - 1].x, scaledPoints[scaledPoints.length - 1].y);
      ctx.stroke();
    } else if (shape === 'rect' && scaledPoints.length >= 2) {
      const p1 = scaledPoints[0];
      const p2 = scaledPoints[scaledPoints.length - 1];
      ctx.beginPath();
      ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    } else if (shape === 'circle' && scaledPoints.length >= 2) {
      const p1 = scaledPoints[0];
      const p2 = scaledPoints[scaledPoints.length - 1];
      const radius = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape === 'star' && scaledPoints.length >= 2) {
      const p1 = scaledPoints[0];
      const p2 = scaledPoints[scaledPoints.length - 1];
      const radius = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      let rot = (Math.PI / 2) * 3;
      let px = p1.x;
      let py = p1.y;
      const step = Math.PI / 5;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y - radius);
      for (let i = 0; i < 5; i++) {
        px = p1.x + Math.cos(rot) * radius;
        py = p1.y + Math.sin(rot) * radius;
        ctx.lineTo(px, py);
        rot += step;
        px = p1.x + Math.cos(rot) * (radius / 2);
        py = p1.y + Math.sin(rot) * (radius / 2);
        ctx.lineTo(px, py);
        rot += step;
      }
      ctx.lineTo(p1.x, p1.y - radius);
      ctx.closePath();
      ctx.stroke();
    } else if (tool === 'calligraphy') {
      const angle = Math.PI / 4;
      const halfW = scaledWidth / 2;
      const dx = Math.cos(angle) * halfW;
      const dy = Math.sin(angle) * halfW;

      for (let i = 0; i < scaledPoints.length - 1; i++) {
        const p1 = scaledPoints[i];
        const p2 = scaledPoints[i + 1];
        ctx.beginPath();
        ctx.moveTo(p1.x - dx, p1.y + dy);
        ctx.lineTo(p1.x + dx, p1.y - dy);
        ctx.lineTo(p2.x + dx, p2.y - dy);
        ctx.lineTo(p2.x - dx, p2.y + dy);
        ctx.closePath();
        ctx.fill();
      }
    } else if (tool === 'airbrush' && scaledPoints.length > 0) {
      scaledPoints.forEach((pt) => {
        const rad = Math.max(2, scaledWidth * (pt.pressure ? pt.pressure * 1.3 : 1));
        const grad = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, rad);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, rad, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (tool === 'pencil') {
      ctx.beginPath();
      if (scaledPoints.length === 1) {
        ctx.arc(scaledPoints[0].x, scaledPoints[0].y, Math.max(1, scaledWidth / 3), 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
        for (let i = 1; i < scaledPoints.length; i++) {
          ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y);
        }
        ctx.stroke();
      }
    } else {
      if (scaledPoints.length === 1) {
        ctx.beginPath();
        ctx.arc(scaledPoints[0].x, scaledPoints[0].y, Math.max(1, scaledWidth / 2), 0, Math.PI * 2);
        ctx.fill();
      } else if (scaledPoints.length === 2) {
        ctx.beginPath();
        ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
        ctx.lineTo(scaledPoints[1].x, scaledPoints[1].y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
        for (let i = 1; i < scaledPoints.length - 1; i++) {
          const xc = (scaledPoints[i].x + scaledPoints[i + 1].x) / 2;
          const yc = (scaledPoints[i].y + scaledPoints[i + 1].y) / 2;
          ctx.quadraticCurveTo(scaledPoints[i].x, scaledPoints[i].y, xc, yc);
        }
        ctx.lineTo(scaledPoints[scaledPoints.length - 1].x, scaledPoints[scaledPoints.length - 1].y);
        ctx.stroke();
      }

      if (tool === 'neon') {
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = Math.max(1.5, scaledWidth * 0.3);
        ctx.beginPath();
        ctx.moveTo(scaledPoints[0].x, scaledPoints[0].y);
        for (let i = 1; i < scaledPoints.length; i++) {
          ctx.lineTo(scaledPoints[i].x, scaledPoints[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.restore();
  };

  const handleExportPNG = (isTransparent = false) => {
    soundEngine.playClick();
    const canvas = createCompositeCanvas(isTransparent, resolutionScale);
    const link = document.createElement('a');
    link.download = `drawitout-${isTransparent ? 'transparent-' : ''}${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    setDownloadSuccess(t('studio_export_png') + ' ' + t('studio_video_ready'));
    soundEngine.playCorrect();
  };

  const handleExportJPG = () => {
    soundEngine.playClick();
    const canvas = createCompositeCanvas(false, resolutionScale);
    const link = document.createElement('a');
    link.download = `drawitout-${Date.now()}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    setDownloadSuccess(t('studio_export_jpg') + ' ' + t('studio_video_ready'));
    soundEngine.playCorrect();
  };

  const handleExportProjectJSON = () => {
    soundEngine.playClick();
    const projectData = {
      app: 'DrawItOut Studio',
      version: '1.0',
      createdAt: new Date().toISOString(),
      width,
      height,
      layers,
      strokes,
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.download = `artwork-project-${Date.now()}.drawitout`;
    link.href = URL.createObjectURL(blob);
    link.click();
    setDownloadSuccess(t('studio_export_project') + ' ' + t('studio_video_ready'));
    soundEngine.playCorrect();
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed.layers && parsed.strokes) {
          onImportProject(parsed);
          soundEngine.playCorrect();
          onClose();
        } else {
          alert('Érvénytelen DrawItOut projektfájl!');
        }
      } catch (err) {
        alert('Hiba történt a projektfájl beolvasásakor!');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-[#386641] text-[#1e242b] bg-white relative shadow-2xl space-y-5">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-[#eaf2eb] rounded-2xl text-[#386641] shadow-2xs">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-[#1e242b]">{t('studio_export_title')}</h2>
              <p className="text-xs text-stone-500 font-bold mt-0.5">
                {t('studio_timelapse_desc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition touch-manipulation active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resolution Scaler */}
        <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700">
            <span>{t('studio_resolution')}:</span>
            <span className="text-[#386641] font-black">
              {width * resolutionScale} × {height * resolutionScale} px
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 4].map((scale) => (
              <button
                key={scale}
                type="button"
                onClick={() => setResolutionScale(scale)}
                className={`py-2 rounded-xl text-xs font-extrabold transition border ${
                  resolutionScale === scale
                    ? 'bg-[#386641] text-white border-[#386641] shadow-2xs'
                    : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {scale}x {scale === 4 ? '(4K Ultra)' : scale === 2 ? '(HD)' : '(Standard)'}
              </button>
            ))}
          </div>
        </div>

        {/* Image Export Options */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => handleExportPNG(false)}
            className="w-full p-3.5 rounded-2xl bg-white hover:bg-[#eaf2eb] border-2 border-stone-200 hover:border-[#386641] text-[#1e242b] font-bold text-xs shadow-xs transition flex items-center justify-between group touch-manipulation active:scale-95"
          >
            <div className="flex items-center space-x-2.5">
              <FileImage className="w-5 h-5 text-[#386641]" />
              <span className="font-extrabold">{t('studio_export_png')} ({t('studio_white_bg')})</span>
            </div>
            <Download className="w-4 h-4 text-stone-400 group-hover:text-[#386641]" />
          </button>

          <button
            type="button"
            onClick={() => handleExportPNG(true)}
            className="w-full p-3.5 rounded-2xl bg-white hover:bg-[#eaf2eb] border-2 border-stone-200 hover:border-[#386641] text-[#1e242b] font-bold text-xs shadow-xs transition flex items-center justify-between group touch-manipulation active:scale-95"
          >
            <div className="flex items-center space-x-2.5">
              <FileImage className="w-5 h-5 text-[#ea580c]" />
              <span className="font-extrabold">{t('studio_export_transparent')}</span>
            </div>
            <Download className="w-4 h-4 text-stone-400 group-hover:text-[#ea580c]" />
          </button>

          <button
            type="button"
            onClick={handleExportJPG}
            className="w-full p-3.5 rounded-2xl bg-white hover:bg-[#eaf2eb] border-2 border-stone-200 hover:border-[#386641] text-[#1e242b] font-bold text-xs shadow-xs transition flex items-center justify-between group touch-manipulation active:scale-95"
          >
            <div className="flex items-center space-x-2.5">
              <FileImage className="w-5 h-5 text-[#2563eb]" />
              <span className="font-extrabold">{t('studio_export_jpg')}</span>
            </div>
            <Download className="w-4 h-4 text-stone-400 group-hover:text-[#2563eb]" />
          </button>
        </div>

        {/* Project File Save / Load Section */}
        <div className="pt-3 border-t border-stone-200 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleExportProjectJSON}
              className="p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300 transition flex items-center justify-center space-x-1.5 touch-manipulation active:scale-95"
            >
              <FileCode className="w-4 h-4 text-[#386641]" />
              <span>{t('studio_export_project')}</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs border border-stone-300 transition flex items-center justify-center space-x-1.5 touch-manipulation active:scale-95"
            >
              <Upload className="w-4 h-4 text-[#ea580c]" />
              <span>{t('studio_import_project')}</span>
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".drawitout,.json"
            onChange={handleImportFile}
            className="hidden"
          />
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-[#eaf2eb] border border-[#c7decb] text-[#2c5234] rounded-2xl text-xs font-bold text-center flex items-center justify-center space-x-1.5 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}
      </div>
    </div>
  );
}
