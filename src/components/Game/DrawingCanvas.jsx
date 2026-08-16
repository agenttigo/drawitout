import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Toolbar } from './Toolbar';
import { soundEngine } from '../../utils/soundEngine';
import { EyeOff } from 'lucide-react';

export function DrawingCanvas({
  isDrawer,
  socket,
  roomId,
  gameMode = 'STANDARD',
  initialTheme = 'white',
  onSendReaction,
}) {
  const { t } = useLanguage();
  const canvasRef = useRef(null);

  const [activeTool, setActiveTool] = useState('pen');
  const [currentColor, setCurrentColor] = useState('#000000'); // Default brush color always black
  const [strokeWidth, setStrokeWidth] = useState(6);
  const [canvasTheme, setCanvasTheme] = useState('white');
  const [particleFx, setParticleFx] = useState('none');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnOneStroke, setHasDrawnOneStroke] = useState(false);

  const startCoordsRef = useRef(null);
  const strokeBufferRef = useRef([]);

  const floodFill = (ctx, startX, startY, fillColor) => {
    const canvas = ctx.canvas;
    const width = canvas.width;
    const height = canvas.height;
    const imgData = ctx.getImageData(0, 0, width, height);
    const data = imgData.data;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 1;
    tempCanvas.height = 1;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.fillStyle = fillColor;
    tempCtx.fillRect(0, 0, 1, 1);
    const fillRgba = tempCtx.getImageData(0, 0, 1, 1).data;

    const targetIdx = (startY * width + startX) * 4;
    const targetR = data[targetIdx];
    const targetG = data[targetIdx + 1];
    const targetB = data[targetIdx + 2];
    const targetA = data[targetIdx + 3];

    if (
      targetR === fillRgba[0] &&
      targetG === fillRgba[1] &&
      targetB === fillRgba[2] &&
      targetA === fillRgba[3]
    ) {
      return;
    }

    const matchTarget = (idx) => {
      return (
        Math.abs(data[idx] - targetR) < 30 &&
        Math.abs(data[idx + 1] - targetG) < 30 &&
        Math.abs(data[idx + 2] - targetB) < 30 &&
        Math.abs(data[idx + 3] - targetA) < 30
      );
    };

    const pixelQueue = [[startX, startY]];
    while (pixelQueue.length > 0) {
      const [x, y] = pixelQueue.pop();
      const idx = (y * width + x) * 4;

      if (x < 0 || x >= width || y < 0 || y >= height) continue;
      if (!matchTarget(idx)) continue;

      data[idx] = fillRgba[0];
      data[idx + 1] = fillRgba[1];
      data[idx + 2] = fillRgba[2];
      data[idx + 3] = fillRgba[3];

      pixelQueue.push([x + 1, y]);
      pixelQueue.push([x - 1, y]);
      pixelQueue.push([x, y + 1]);
      pixelQueue.push([x, y - 1]);
    }

    ctx.putImageData(imgData, 0, 0);
  };

  const drawSegment = useCallback((ctx, stroke) => {
    if (!ctx) return;
    const { tool, color, width, points, particleFx: strokeFx } = stroke;
    if (!points || points.length === 0) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    let strokeColor = color;
    if (strokeFx === 'rainbow') {
      const hue = (Date.now() / 10) % 360;
      strokeColor = `hsl(${hue}, 90%, 60%)`;
    }

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = width * 1.5;
    } else if (tool === 'highlighter') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = strokeColor;
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = width * 2;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.globalAlpha = 1.0;
      ctx.lineWidth = width;
    }

    if (tool === 'line' && points.length >= 2) {
      const start = points[0];
      const end = points[points.length - 1];
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    } else if (tool === 'circle' && points.length >= 2) {
      const start = points[0];
      const end = points[points.length - 1];
      const radius = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
      ctx.beginPath();
      ctx.arc(start.x, start.y, radius, 0, Math.PI * 2);
      ctx.stroke();
    } else if (tool === 'rectangle' && points.length >= 2) {
      const start = points[0];
      const end = points[points.length - 1];
      ctx.beginPath();
      ctx.rect(start.x, start.y, end.x - start.x, end.y - start.y);
      ctx.stroke();
    } else {
      if (points.length === 1) {
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          const xc = (points[i].x + points[i - 1].x) / 2;
          const yc = (points[i].y + points[i - 1].y) / 2;
          ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, xc, yc);
        }
        ctx.stroke();
      }
    }

    if (strokeFx === 'stars') {
      points.forEach((pt) => {
        ctx.fillStyle = '#fbbf24';
        ctx.font = '12px sans-serif';
        ctx.fillText('✨', pt.x + 4, pt.y - 4);
      });
    }

    ctx.restore();
  }, []);

  // Clear canvas whenever drawer changes or turn starts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnOneStroke(false);
  }, [isDrawer, roomId]);

  useEffect(() => {
    if (!socket) return;

    const handleDrawStroke = (strokeData) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      drawSegment(ctx, strokeData);
    };

    const handleCanvasFill = (fillData) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      floodFill(ctx, fillData.x, fillData.y, fillData.color);
    };

    const handleCanvasClear = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawnOneStroke(false);
    };

    const handleCanvasRestore = (strokes) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      strokes.forEach((item) => {
        if (item.type === 'fill') {
          floodFill(ctx, item.x, item.y, item.color);
        } else {
          drawSegment(ctx, item);
        }
      });
    };

    socket.on('draw_stroke', handleDrawStroke);
    socket.on('canvas_fill', handleCanvasFill);
    socket.on('canvas_clear', handleCanvasClear);
    socket.on('turn_started', handleCanvasClear);
    socket.on('turn_ended', handleCanvasClear);
    socket.on('canvas_restore', handleCanvasRestore);

    return () => {
      socket.off('draw_stroke', handleDrawStroke);
      socket.off('canvas_fill', handleCanvasFill);
      socket.off('canvas_clear', handleCanvasClear);
      socket.off('turn_started', handleCanvasClear);
      socket.off('turn_ended', handleCanvasClear);
      socket.off('canvas_restore', handleCanvasRestore);
    };
  }, [socket, drawSegment]);

  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = e.clientX;
    let clientY = e.clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    return {
      x: Math.round((clientX - rect.left) * scaleX),
      y: Math.round((clientY - rect.top) * scaleY),
    };
  };

  const startDrawing = (e) => {
    if (!isDrawer) return;
    if (gameMode === 'ONE_STROKE' && hasDrawnOneStroke) return;
    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
    const coords = getCanvasCoords(e);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (activeTool === 'fill') {
      floodFill(ctx, coords.x, coords.y, currentColor);
      if (socket) {
        socket.emit('canvas_fill', { roomId, fillData: { x: coords.x, y: coords.y, color: currentColor } });
      }
      soundEngine.playPop();
      if (gameMode === 'ONE_STROKE') setHasDrawnOneStroke(true);
      return;
    }

    setIsDrawing(true);
    startCoordsRef.current = coords;
    strokeBufferRef.current = [coords];

    if (!['line', 'circle', 'rectangle'].includes(activeTool)) {
      drawSegment(ctx, {
        tool: activeTool,
        color: currentColor,
        width: strokeWidth,
        particleFx,
        points: [coords],
      });
    }
  };

  const draw = (e) => {
    if (!isDrawer || !isDrawing) return;
    if (e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
    const coords = getCanvasCoords(e);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (['line', 'circle', 'rectangle'].includes(activeTool)) {
      strokeBufferRef.current = [startCoordsRef.current, coords];
    } else {
      strokeBufferRef.current.push(coords);
      const strokeSegment = {
        tool: activeTool,
        color: currentColor,
        width: strokeWidth,
        particleFx,
        points: strokeBufferRef.current.slice(-3),
      };

      drawSegment(ctx, strokeSegment);

      if (socket) {
        socket.emit('draw_stroke', { roomId, strokeData: strokeSegment });
      }
    }
  };

  const stopDrawing = (e) => {
    if (!isDrawer || !isDrawing) return;
    if (e && e.cancelable && e.type.startsWith('touch')) {
      e.preventDefault();
    }
    setIsDrawing(false);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (['line', 'circle', 'rectangle'].includes(activeTool)) {
      const shapeStroke = {
        tool: activeTool,
        color: currentColor,
        width: strokeWidth,
        particleFx,
        points: strokeBufferRef.current,
      };
      drawSegment(ctx, shapeStroke);
      if (socket) {
        socket.emit('draw_stroke', { roomId, strokeData: shapeStroke });
      }
    }

    if (gameMode === 'ONE_STROKE') {
      setHasDrawnOneStroke(true);
    }

    strokeBufferRef.current = [];
  };

  const handleClear = () => {
    if (!isDrawer) return;
    soundEngine.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawnOneStroke(false);
    if (socket) {
      socket.emit('canvas_clear', { roomId });
    }
  };

  const handleUndo = () => {
    if (!isDrawer) return;
    soundEngine.playClick();
    if (socket) {
      socket.emit('canvas_undo', { roomId });
    }
  };

  const handleDownload = () => {
    soundEngine.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `drawitout-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleSuperHint = () => {
    if (socket) {
      socket.emit('request_hint', { roomId });
    }
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2.5 relative">
      {/* Canvas Box - Strictly White Always & Touch-Action None */}
      <div className="relative w-full aspect-[4/3] max-h-[70vh] md:max-h-[640px] rounded-2xl overflow-hidden glass-panel border-2 border-amber-200/80 shadow-md flex items-center justify-center bg-white touch-none">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          onTouchCancel={stopDrawing}
          style={{ touchAction: 'none' }}
          className={`w-full h-full object-contain bg-white touch-none ${
            isDrawer
              ? activeTool === 'fill'
                ? 'canvas-cursor-fill'
                : 'canvas-cursor-crosshair'
              : 'cursor-default'
          }`}
        />

        {/* Blind Mode Overlay */}
        {isDrawer && gameMode === 'BLIND' && (
          <div className="absolute inset-0 bg-stone-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center space-y-3 pointer-events-none">
            <EyeOff className="w-12 h-12 text-amber-400 animate-pulse" />
            <h3 className="text-xl font-black text-white">{t('blind_draw_title')}</h3>
            <p className="text-xs text-stone-300 max-w-xs font-semibold">
              {t('blind_draw_desc')}
            </p>
          </div>
        )}

        {!isDrawer && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-amber-700/60 text-[11px] md:text-xs font-semibold text-white flex items-center space-x-1.5 shadow-lg pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>{t('spectator_mode')} {gameMode === 'BLIND' ? '(🙈)' : '✏️'}</span>
          </div>
        )}
      </div>

      {/* Drawer Controls */}
      {isDrawer && (
        <Toolbar
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          currentColor={currentColor}
          setCurrentColor={setCurrentColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          canvasTheme={canvasTheme}
          setCanvasTheme={setCanvasTheme}
          particleFx={particleFx}
          setParticleFx={setParticleFx}
          onClear={handleClear}
          onUndo={handleUndo}
          onDownload={handleDownload}
          onRequestSuperHint={handleSuperHint}
        />
      )}
    </div>
  );
}
