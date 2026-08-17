import React, { useEffect, useState } from 'react';

export function LightSunriseEasterEgg({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: start, 1: rising, 2: peak golden dawn, 3: fade out

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 50);   // Rising
    const t2 = setTimeout(() => setPhase(2), 450);  // Peak golden dawn
    const t3 = setTimeout(() => setPhase(3), 1000); // Fade out
    const t4 = setTimeout(() => {
      onComplete?.();
    }, 1400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* 1. Golden Dawn Flood Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-600 ease-out ${
          phase === 0
            ? 'opacity-0'
            : phase === 1
            ? 'opacity-60'
            : phase === 2
            ? 'opacity-90'
            : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 110% 85% at 50% 100%, rgba(254, 240, 138, 0.6) 0%, rgba(251, 191, 36, 0.35) 35%, rgba(253, 186, 116, 0.15) 65%, transparent 100%)',
        }}
      />

      {/* 2. The Rising Sun with Radiant Corona Rays */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-transform duration-800 ease-out ${
          phase === 0
            ? 'translate-y-48 scale-75 opacity-0'
            : phase === 1
            ? 'translate-y-16 scale-90 opacity-90'
            : phase === 2
            ? '-translate-y-6 scale-105 opacity-100'
            : '-translate-y-20 scale-120 opacity-0'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div className="w-80 h-80 rounded-full bg-amber-300/25 blur-2xl animate-pulse" />

          {/* Core Sun Disc */}
          <div className="absolute w-36 h-36 rounded-full bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 shadow-[0_0_70px_25px_rgba(251,191,36,0.7)] border-4 border-yellow-100/50" />

          {/* Horizon Ray Flare */}
          <div className="absolute w-64 h-1 bg-gradient-to-r from-transparent via-amber-200 to-transparent blur-xs" />
        </div>
      </div>
    </div>
  );
}
