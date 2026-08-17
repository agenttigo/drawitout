import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Play,
  Pause,
  RotateCcw,
  Film,
  Download,
  X,
  CheckCircle,
  Loader2,
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function TimelapseModal({
  strokes = [],
  layers = [],
  width = 1200,
  height = 900,
  onClose,
}) {
  const { t } = useLanguage();
  const replayCanvasRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(2);
  const [isExportingVideo, setIsExportingVideo] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportSuccess, setExportSuccess] = useState(false);

  const animFrameRef = useRef(null);

  const floodFill = (ctx, startX, startY, fillColor) => {
    if (!ctx || startX < 0 || startY < 0 || startX >= width || startY >= height) return;

    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = fillColor;
    tempCtx.fillRect(0, 0, 1, 1);
    const fillRgba = tempCtx.getImageData(0, 0, 1, 1).data;

    const startIdx = (startY * width + startX) * 4;
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
    const visited = new Uint8Array(width * height);

    while (pixelStack.length > 0) {
      const [curX, curY] = pixelStack.pop();
      const pixelPos = curY * width + curX;
      const idx = pixelPos * 4;

      if (visited[pixelPos]) continue;
      visited[pixelPos] = 1;

      if (!matchesTarget(idx)) continue;

      data[idx] = fillRgba[0];
      data[idx + 1] = fillRgba[1];
      data[idx + 2] = fillRgba[2];
      data[idx + 3] = 255;

      if (curX > 0 && !visited[pixelPos - 1]) pixelStack.push([curX - 1, curY]);
      if (curX < width - 1 && !visited[pixelPos + 1]) pixelStack.push([curX + 1, curY]);
      if (curY > 0 && !visited[pixelPos - width]) pixelStack.push([curX, curY - 1]);
      if (curY < height - 1 && !visited[pixelPos + width]) pixelStack.push([curX, curY + 1]);
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const renderUpToIndex = (index) => {
    const canvas = replayCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const activeStrokes = strokes.slice(0, index);

    layers.forEach((layer) => {
      if (!layer.visible) return;

      ctx.save();
      ctx.globalAlpha = layer.opacity !== undefined ? layer.opacity : 1;

      activeStrokes
        .filter((s) => s.layerId === layer.id || (!s.layerId && layer.id === layers[0]?.id))
        .forEach((s) => {
          drawReplayStroke(ctx, s);
        });

      ctx.restore();
    });

    // Watermark
    ctx.save();
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = 'rgba(56, 102, 65, 0.45)';
    ctx.textAlign = 'right';
    ctx.fillText(t('studio_watermark_text'), canvas.width - 20, canvas.height - 20);
    ctx.restore();
  };

  const drawReplayStroke = (ctx, stroke) => {
    const { tool, color, width: sWidth, opacity = 1, points, shape, x, y } = stroke;

    if (tool === 'fill') {
      floodFill(ctx, x !== undefined ? x : points?.[0]?.x, y !== undefined ? y : points?.[0]?.y, color);
      return;
    }

    if (!points || points.length === 0) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = opacity;

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = sWidth * 1.5;
    } else if (tool === 'neon') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = sWidth * 2.5;
      ctx.lineWidth = sWidth;
    } else if (tool === 'airbrush') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = sWidth * 2;
      ctx.globalAlpha = opacity * 0.35;
      ctx.lineWidth = sWidth * 1.5;
    } else if (tool === 'watercolor') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity * 0.25;
      ctx.lineWidth = sWidth * 1.4;
    } else if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity * 0.75;
      ctx.lineWidth = Math.max(1, sWidth * 0.8);
    } else if (tool === 'calligraphy') {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
    } else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = sWidth;
    }

    if (shape === 'line' && points.length >= 2) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.stroke();
    } else if (shape === 'rect' && points.length >= 2) {
      const p1 = points[0];
      const p2 = points[points.length - 1];
      ctx.beginPath();
      ctx.strokeRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    } else if (shape === 'circle' && points.length >= 2) {
      const p1 = points[0];
      const p2 = points[points.length - 1];
      const radius = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      ctx.beginPath();
      ctx.arc(p1.x, p1.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (shape === 'star' && points.length >= 2) {
      const p1 = points[0];
      const p2 = points[points.length - 1];
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
      const halfW = sWidth / 2;
      const dx = Math.cos(angle) * halfW;
      const dy = Math.sin(angle) * halfW;

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        ctx.beginPath();
        ctx.moveTo(p1.x - dx, p1.y + dy);
        ctx.lineTo(p1.x + dx, p1.y - dy);
        ctx.lineTo(p2.x + dx, p2.y - dy);
        ctx.lineTo(p2.x - dx, p2.y + dy);
        ctx.closePath();
        ctx.fill();
      }
    } else if (tool === 'airbrush' && points.length > 0) {
      points.forEach((pt) => {
        const rad = Math.max(2, sWidth * (pt.pressure ? pt.pressure * 1.3 : 1));
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
      if (points.length === 1) {
        ctx.arc(points[0].x, points[0].y, Math.max(1, sWidth / 3), 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
      }
    } else {
      if (points.length === 1) {
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, Math.max(1, sWidth / 2), 0, Math.PI * 2);
        ctx.fill();
      } else if (points.length === 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.stroke();
      }

      if (tool === 'neon') {
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 0.85;
        ctx.lineWidth = Math.max(1.5, sWidth * 0.3);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();
        ctx.restore();
      }
    }

    ctx.restore();
  };

  useEffect(() => {
    renderUpToIndex(strokes.length);
    setCurrentStrokeIndex(strokes.length);
  }, [strokes, layers]);

  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const step = () => {
      setCurrentStrokeIndex((prev) => {
        if (prev >= strokes.length) {
          setIsPlaying(false);
          return strokes.length;
        }
        const nextIndex = Math.min(strokes.length, prev + Math.max(1, Math.round(playbackSpeed * 1.5)));
        renderUpToIndex(nextIndex);
        return nextIndex;
      });

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, playbackSpeed, strokes.length]);

  const handleTogglePlay = () => {
    soundEngine.playClick();
    if (currentStrokeIndex >= strokes.length) {
      setCurrentStrokeIndex(0);
      renderUpToIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    soundEngine.playClick();
    setIsPlaying(false);
    setCurrentStrokeIndex(0);
    renderUpToIndex(0);
  };

  const handleScrub = (val) => {
    setIsPlaying(false);
    const target = parseInt(val, 10);
    setCurrentStrokeIndex(target);
    renderUpToIndex(target);
  };

  const handleExportVideo = async () => {
    if (strokes.length === 0) return;
    soundEngine.playClick();
    setIsPlaying(false);
    setIsExportingVideo(true);
    setExportProgress(0);
    setExportSuccess(false);

    const canvas = replayCanvasRef.current;
    if (!canvas) return;

    try {
      const stream = canvas.captureStream(30);
      let mimeType = 'video/webm;codecs=vp9';
      if (!MediaRecorder.isTypeSupported(mimeType)) {
        mimeType = 'video/webm';
      }

      const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 4000000 });
      const chunks = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `drawitout-timelapse-${Date.now()}.webm`;
        a.click();
        setIsExportingVideo(false);
        setExportSuccess(true);
        soundEngine.playCorrect();
      };

      recorder.start();

      const totalSteps = strokes.length;
      const stepSize = Math.max(1, Math.floor(totalSteps / 60));

      for (let i = 0; i <= totalSteps; i += stepSize) {
        renderUpToIndex(i);
        setExportProgress(Math.round((i / totalSteps) * 100));
        await new Promise((r) => setTimeout(r, 40));
      }

      renderUpToIndex(totalSteps);
      await new Promise((r) => setTimeout(r, 800));

      recorder.stop();
    } catch (err) {
      console.error('Timelapse recording failed:', err);
      setIsExportingVideo(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && !isExportingVideo) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-stone-900/75 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-4xl glass-panel rounded-3xl p-5 md:p-7 border-2 border-[#386641] text-[#1e242b] bg-white relative shadow-2xl space-y-4 flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 bg-[#eaf2eb] rounded-2xl text-[#386641] shadow-2xs">
              <Film className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-black text-[#1e242b]">
                {t('studio_timelapse_title')}
              </h2>
              <p className="text-xs text-stone-500 font-bold mt-0.5">
                {t('studio_timelapse_desc')}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={isExportingVideo}
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition touch-manipulation active:scale-95 disabled:opacity-30"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative w-full aspect-[4/3] max-h-[55vh] rounded-2xl overflow-hidden border-2 border-[#e5e0d5] bg-white shadow-inner flex items-center justify-center">
          <canvas
            ref={replayCanvasRef}
            width={width}
            height={height}
            className="w-full h-full object-contain bg-white"
          />

          {isExportingVideo && (
            <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm flex flex-col items-center justify-center space-y-3 p-6 text-center text-white">
              <Loader2 className="w-10 h-10 text-[#e9c46a] animate-spin" />
              <h3 className="text-lg font-black">{t('studio_export_generating')}</h3>
              <div className="w-64 bg-stone-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#386641] h-full transition-all duration-100"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <span className="text-xs font-bold text-stone-300">{exportProgress}%</span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-3 px-2">
          <span className="text-xs font-bold text-stone-500 min-w-10 text-left">
            {currentStrokeIndex} / {strokes.length}
          </span>
          <input
            type="range"
            min="0"
            max={strokes.length}
            value={currentStrokeIndex}
            onChange={(e) => handleScrub(e.target.value)}
            disabled={isExportingVideo}
            className="flex-1 accent-[#386641] h-2 bg-stone-200 rounded-lg cursor-pointer disabled:opacity-50"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-200">
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={handleTogglePlay}
              disabled={isExportingVideo || strokes.length === 0}
              className="py-2 px-4 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-extrabold text-xs shadow-md transition flex items-center space-x-1.5 touch-manipulation active:scale-95 disabled:opacity-40"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? t('studio_timelapse_pause') : t('studio_timelapse_play')}</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              disabled={isExportingVideo}
              className="p-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition border border-stone-200 touch-manipulation active:scale-95"
              title={t('studio_reset_start')}
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-2xl border border-stone-200 text-xs font-black">
              {[1, 2, 5, 10].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => { soundEngine.playClick(); setPlaybackSpeed(spd); }}
                  className={`px-2.5 py-1 rounded-xl transition ${
                    playbackSpeed === spd
                      ? 'bg-[#386641] text-white shadow-2xs'
                      : 'text-stone-600 hover:text-black'
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {exportSuccess && (
              <span className="text-xs font-bold text-[#2c5234] flex items-center space-x-1 bg-[#eaf2eb] px-3 py-1.5 rounded-xl border border-[#c7decb]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{t('studio_video_ready')}</span>
              </span>
            )}

            <button
              type="button"
              disabled={isExportingVideo || strokes.length === 0}
              onClick={handleExportVideo}
              className="py-2.5 px-5 rounded-2xl bg-[#ea580c] hover:bg-[#c2410c] text-white font-extrabold text-xs shadow-md transition flex items-center space-x-2 touch-manipulation active:scale-95 disabled:opacity-40"
            >
              <Download className="w-4 h-4" />
              <span>{t('studio_export_video')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
