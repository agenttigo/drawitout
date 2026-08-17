import React, { useRef, useEffect, useState, useCallback } from 'react';
import { soundEngine } from '../../utils/soundEngine';

export function StudioCanvas({
  layers = [],
  activeLayerId,
  activeTool = 'pen',
  currentColor = '#000000',
  strokeWidth = 6,
  strokeOpacity = 1,
  stabilizer = 0.5,
  usePressure = true,
  symmetryMode = 'none',
  activeShape = 'none',
  gridMode = 'none',
  strokes = [],
  onAddStroke,
  onEyedropperPick,
  multiplayerCursors = [],
  onCursorMove,
  width = 1200,
  height = 900,
}) {
  const containerRef = useRef(null);
  const mainCanvasRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const gridCanvasRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const currentPointsRef = useRef([]);
  const startCoordRef = useRef(null);

  const activeLayer = layers.find((l) => l.id === activeLayerId) || layers[0];

  // ==========================================
  // FLOOD FILL ENGINE
  // ==========================================
  const floodFill = useCallback((ctx, startX, startY, fillColor) => {
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

    // Avoid infinite loop on identical color
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
      data[idx + 3] = 255; // Solid fill

      if (curX > 0 && !visited[pixelPos - 1]) pixelStack.push([curX - 1, curY]);
      if (curX < width - 1 && !visited[pixelPos + 1]) pixelStack.push([curX + 1, curY]);
      if (curY > 0 && !visited[pixelPos - width]) pixelStack.push([curX, curY - 1]);
      if (curY < height - 1 && !visited[pixelPos + width]) pixelStack.push([curX, curY + 1]);
    }

    ctx.putImageData(imgData, 0, 0);
  }, [width, height]);

  // ==========================================
  // DISTINCT BRUSH RENDERING ENGINE
  // ==========================================
  const drawSingleStroke = useCallback((ctx, stroke) => {
    const { tool, color, width: sWidth, opacity = 1, points, shape, x, y } = stroke;

    // Handle Bucket Fill
    if (tool === 'fill') {
      floodFill(ctx, x !== undefined ? x : points?.[0]?.x, y !== undefined ? y : points?.[0]?.y, color);
      return;
    }

    if (!points || points.length === 0) return;

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = opacity;

    // 1. ERASER
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = sWidth * 1.5;
    }
    // 2. NEON GLOW BRUSH (Dual bloom + white laser core)
    else if (tool === 'neon') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = sWidth * 2.5;
      ctx.lineWidth = sWidth;
    }
    // 3. AIRBRUSH (Soft radial spray)
    else if (tool === 'airbrush') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.shadowColor = color;
      ctx.shadowBlur = sWidth * 2;
      ctx.globalAlpha = opacity * 0.35;
      ctx.lineWidth = sWidth * 1.5;
    }
    // 4. WATERCOLOR (Layered translucent wash)
    else if (tool === 'watercolor') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity * 0.25;
      ctx.lineWidth = sWidth * 1.4;
    }
    // 5. GRAPHITE PENCIL (Texturized fine sketch)
    else if (tool === 'pencil') {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.globalAlpha = opacity * 0.75;
      ctx.lineWidth = Math.max(1, sWidth * 0.8);
    }
    // 6. CALLIGRAPHY (45-degree angled chisel nib)
    else if (tool === 'calligraphy') {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
    }
    // 7. INKING PEN (Crisp, sharp, solid)
    else {
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.lineWidth = sWidth;
    }

    // Geometrical Shapes
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
      drawStarShape(ctx, p1.x, p1.y, 5, radius, radius / 2);
      ctx.stroke();
    }
    // Calligraphy Chisel Nib Rendering
    else if (tool === 'calligraphy') {
      const angle = Math.PI / 4; // 45 degrees
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
    }
    // Airbrush Radial Spray Stamps
    else if (tool === 'airbrush' && points.length > 0) {
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
    }
    // Pencil Texturized Scatter
    else if (tool === 'pencil') {
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

        // Add subtle graphite dust
        for (let i = 0; i < points.length; i += 2) {
          const pt = points[i];
          const jitterX = (Math.random() - 0.5) * sWidth * 0.6;
          const jitterY = (Math.random() - 0.5) * sWidth * 0.6;
          ctx.fillRect(pt.x + jitterX, pt.y + jitterY, 1.2, 1.2);
        }
      }
    }
    // Inking Pen / Neon / Watercolor Standard Path
    else {
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

      // Neon Inner White Core
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
  }, [floodFill]);

  const drawStarShape = (ctx, cx, cy, spikes, outerRadius, innerRadius) => {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  };

  // ==========================================
  // RENDER COMPOSITE ARTWORK
  // ==========================================
  const renderAllLayers = useCallback(() => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Pure white canvas background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    layers.forEach((layer) => {
      if (!layer.visible) return;

      ctx.save();
      ctx.globalAlpha = layer.opacity !== undefined ? layer.opacity : 1;

      strokes
        .filter((s) => s.layerId === layer.id || (!s.layerId && layer.id === layers[0]?.id))
        .forEach((s) => {
          drawSingleStroke(ctx, s);
        });

      ctx.restore();
    });
  }, [layers, strokes, drawSingleStroke]);

  useEffect(() => {
    renderAllLayers();
  }, [renderAllLayers]);

  // ==========================================
  // RENDER GRID & SYMMETRY GUIDELINES
  // ==========================================
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (gridMode === 'square') {
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();
    } else if (gridMode === 'isometric') {
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = -canvas.height; x < canvas.width + canvas.height; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + canvas.height * 0.577, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - canvas.height * 0.577, canvas.height);
        ctx.stroke();
      }
      ctx.restore();
    }

    if (symmetryMode !== 'none') {
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 102, 65, 0.4)';
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 1.5;

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      if (symmetryMode === 'vertical' || symmetryMode === 'radial4' || symmetryMode === 'radial8') {
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx, canvas.height);
        ctx.stroke();
      }
      if (symmetryMode === 'horizontal' || symmetryMode === 'radial4' || symmetryMode === 'radial8') {
        ctx.beginPath();
        ctx.moveTo(0, cy);
        ctx.lineTo(canvas.width, cy);
        ctx.stroke();
      }
      if (symmetryMode === 'radial8') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(canvas.width, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
      }
      ctx.restore();
    }
  }, [gridMode, symmetryMode, width, height]);

  // Generate symmetry coordinates
  const getSymmetryPoints = useCallback((pt) => {
    const cx = width / 2;
    const cy = height / 2;
    const pts = [pt];

    if (symmetryMode === 'vertical' || symmetryMode === 'radial4' || symmetryMode === 'radial8') {
      pts.push({ x: 2 * cx - pt.x, y: pt.y, pressure: pt.pressure });
    }
    if (symmetryMode === 'horizontal' || symmetryMode === 'radial4' || symmetryMode === 'radial8') {
      pts.push({ x: pt.x, y: 2 * cy - pt.y, pressure: pt.pressure });
      if (symmetryMode === 'radial4' || symmetryMode === 'radial8') {
        pts.push({ x: 2 * cx - pt.x, y: 2 * cy - pt.y, pressure: pt.pressure });
      }
    }

    return pts;
  }, [symmetryMode, width, height]);

  // ==========================================
  // PIXEL-PERFECT COORDINATE CALCULATION
  // ==========================================
  const getCanvasCoords = (e) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return { x: 0, y: 0, pressure: 0.5 };
    const rect = canvas.getBoundingClientRect();

    const canvasAspect = canvas.width / canvas.height;
    const rectAspect = rect.width / rect.height;

    let renderWidth = rect.width;
    let renderHeight = rect.height;
    let offsetX = 0;
    let offsetY = 0;

    if (rectAspect > canvasAspect) {
      renderWidth = rect.height * canvasAspect;
      offsetX = (rect.width - renderWidth) / 2;
    } else {
      renderHeight = rect.width / canvasAspect;
      offsetY = (rect.height - renderHeight) / 2;
    }

    let clientX = e.clientX;
    let clientY = e.clientY;
    let pressure = 0.5;

    if (e.pressure !== undefined && e.pressure > 0 && usePressure) {
      pressure = e.pressure;
    }

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      if (e.touches[0].force && usePressure) {
        pressure = e.touches[0].force;
      }
    }

    const mouseX = clientX - rect.left - offsetX;
    const mouseY = clientY - rect.top - offsetY;

    const x = Math.round(Math.max(0, Math.min(canvas.width, (mouseX / renderWidth) * canvas.width)));
    const y = Math.round(Math.max(0, Math.min(canvas.height, (mouseY / renderHeight) * canvas.height)));

    return { x, y, pressure };
  };

  // ==========================================
  // EYEDROPPER COLOR PICKER
  // ==========================================
  const pickColorFromCanvas = (x, y) => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const hex = `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2]).toString(16).slice(1)}`;
    onEyedropperPick?.(hex);
    soundEngine.playPop();
  };

  // ==========================================
  // POINTER INTERACTIONS
  // ==========================================
  const handlePointerDown = (e) => {
    if (activeLayer?.locked) return;
    e.preventDefault();
    try {
      e.target.setPointerCapture?.(e.pointerId);
    } catch (_) {}

    const coords = getCanvasCoords(e);

    if (activeTool === 'eyedropper') {
      pickColorFromCanvas(coords.x, coords.y);
      return;
    }

    if (activeTool === 'fill') {
      const fillStroke = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        layerId: activeLayerId,
        tool: 'fill',
        color: currentColor,
        x: coords.x,
        y: coords.y,
        timestamp: Date.now(),
      };
      onAddStroke?.(fillStroke);
      soundEngine.playPop();
      return;
    }

    setIsDrawing(true);
    startCoordRef.current = coords;
    currentPointsRef.current = [coords];

    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) return;
    const previewCtx = previewCanvas.getContext('2d');
    previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);

    if (activeShape === 'none') {
      const symPoints = getSymmetryPoints(coords);
      symPoints.forEach((spt) => {
        drawSingleStroke(previewCtx, {
          tool: activeTool,
          color: currentColor,
          width: strokeWidth * (usePressure ? (coords.pressure || 0.5) * 1.5 : 1),
          opacity: strokeOpacity,
          points: [spt],
        });
      });
    }
  };

  const handlePointerMove = (e) => {
    const coords = getCanvasCoords(e);
    onCursorMove?.({ x: coords.x, y: coords.y });

    if (!isDrawing || activeLayer?.locked) return;
    e.preventDefault();

    const previewCanvas = previewCanvasRef.current;
    if (!previewCanvas) return;
    const previewCtx = previewCanvas.getContext('2d');

    if (activeShape !== 'none') {
      previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      drawSingleStroke(previewCtx, {
        tool: activeTool,
        color: currentColor,
        width: strokeWidth,
        opacity: strokeOpacity,
        shape: activeShape,
        points: [startCoordRef.current, coords],
      });
    } else {
      let targetPoint = coords;
      if (stabilizer > 0 && currentPointsRef.current.length > 0) {
        const last = currentPointsRef.current[currentPointsRef.current.length - 1];
        const factor = 1 - stabilizer * 0.65;
        targetPoint = {
          x: Math.round(last.x + (coords.x - last.x) * factor),
          y: Math.round(last.y + (coords.y - last.y) * factor),
          pressure: coords.pressure,
        };
      }

      currentPointsRef.current.push(targetPoint);
      const len = currentPointsRef.current.length;

      if (len >= 2) {
        const p1 = currentPointsRef.current[len - 2];
        const p2 = currentPointsRef.current[len - 1];
        const dynamicWidth = strokeWidth * (usePressure ? (coords.pressure || 0.5) * 1.5 : 1);

        const symCoords1 = getSymmetryPoints(p1);
        const symCoords2 = getSymmetryPoints(p2);

        for (let i = 0; i < symCoords1.length; i++) {
          drawSingleStroke(previewCtx, {
            tool: activeTool,
            color: currentColor,
            width: dynamicWidth,
            opacity: strokeOpacity,
            points: [symCoords1[i], symCoords2[i]],
          });
        }
      }
    }
  };

  const handlePointerUp = (e) => {
    if (!isDrawing || activeLayer?.locked) return;
    e.preventDefault();
    try {
      e.target.releasePointerCapture?.(e.pointerId);
    } catch (_) {}

    setIsDrawing(false);

    const previewCanvas = previewCanvasRef.current;
    if (previewCanvas) {
      const previewCtx = previewCanvas.getContext('2d');
      previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
    }

    if (activeShape !== 'none') {
      const endCoords = getCanvasCoords(e);
      const shapeStroke = {
        id: Date.now() + Math.random().toString(36).substr(2, 5),
        layerId: activeLayerId,
        tool: activeTool,
        color: currentColor,
        width: strokeWidth,
        opacity: strokeOpacity,
        shape: activeShape,
        points: [startCoordRef.current, endCoords],
        timestamp: Date.now(),
      };
      onAddStroke?.(shapeStroke);
    } else {
      if (currentPointsRef.current.length > 0) {
        const basePoints = [...currentPointsRef.current];
        const numSymmetries = getSymmetryPoints(basePoints[0]).length;

        for (let sIdx = 0; sIdx < numSymmetries; sIdx++) {
          const symPoints = basePoints.map((pt) => getSymmetryPoints(pt)[sIdx]);
          const newStroke = {
            id: Date.now() + Math.random().toString(36).substr(2, 5) + `_${sIdx}`,
            layerId: activeLayerId,
            tool: activeTool,
            color: currentColor,
            width: strokeWidth,
            opacity: strokeOpacity,
            points: symPoints,
            timestamp: Date.now(),
          };
          onAddStroke?.(newStroke);
        }
      }
    }

    currentPointsRef.current = [];
    startCoordRef.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="drawing-board-wrapper relative w-full rounded-3xl overflow-hidden border-2 border-[#e5e0d5] dark:border-[#386641] shadow-xl bg-white dark:bg-[#181d24] flex items-center justify-center p-1 sm:p-2 touch-none select-none"
    >
      <div className="canvas-paper relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-inner">
        {/* 1. Main Composite Canvas */}
        <canvas
          ref={mainCanvasRef}
          width={width}
          height={height}
          className="canvas-paper absolute inset-0 w-full h-full object-contain bg-white"
        />

        {/* 2. Grid & Symmetry Guideline Layer */}
        <canvas
          ref={gridCanvasRef}
          width={width}
          height={height}
          className="canvas-overlay absolute inset-0 w-full h-full object-contain pointer-events-none bg-transparent"
        />

        {/* 3. Live Active Interaction & Preview Canvas */}
        <canvas
          ref={previewCanvasRef}
          width={width}
          height={height}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none' }}
          className={`canvas-overlay absolute inset-0 w-full h-full object-contain touch-none bg-transparent ${
            activeTool === 'eyedropper'
              ? 'cursor-crosshair'
              : activeTool === 'fill'
              ? 'canvas-cursor-fill'
              : 'canvas-cursor-crosshair'
          }`}
        />

        {/* 4. Multiplayer Live Cursors Overlay */}
        {multiplayerCursors.map((c) => (
          <div
            key={c.id}
            style={{
              transform: `translate(${c.cursor?.x || -100}px, ${c.cursor?.y || -100}px)`,
              transition: 'transform 0.05s linear',
            }}
            className="absolute top-0 left-0 pointer-events-none flex items-center space-x-1.5 z-30"
          >
            <div
              style={{ backgroundColor: c.color || '#386641' }}
              className="w-3 h-3 rounded-full border-2 border-white shadow-md animate-pulse"
            />
            <span
              style={{ backgroundColor: c.color || '#386641' }}
              className="px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-xs"
            >
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
