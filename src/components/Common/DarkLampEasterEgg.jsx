import React, { useEffect, useState } from 'react';

export function DarkLampEasterEgg({ onComplete }) {
  const [flickerState, setFlickerState] = useState(0); // 0: enter, 1: spark1, 2: dim, 3: spark2, 4: bright light, 5: retract

  useEffect(() => {
    const t1 = setTimeout(() => setFlickerState(1), 120);  // 1st spark
    const t2 = setTimeout(() => setFlickerState(2), 240);  // dim
    const t3 = setTimeout(() => setFlickerState(3), 360);  // 2nd spark
    const t4 = setTimeout(() => setFlickerState(4), 480);  // full warm spotlight
    const t5 = setTimeout(() => setFlickerState(5), 1100); // retract lamp
    const t6 = setTimeout(() => {
      onComplete?.();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [onComplete]);

  const isLightOn = flickerState === 1 || flickerState === 3 || flickerState === 4 || flickerState === 5;
  const isRetracting = flickerState === 5;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* 1. Warm Golden Spotlight Cone from ceiling */}
      {isLightOn && (
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[850px] pointer-events-none transition-all duration-300 ${
            isRetracting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          style={{
            background:
              'radial-gradient(ellipse 65% 75% at 50% 0%, rgba(251, 191, 36, 0.35) 0%, rgba(217, 119, 6, 0.12) 45%, transparent 75%)',
          }}
        />
      )}

      {/* 2. Hanging Vintage Lamp Pendant */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-500 ease-in-out ${
          isRetracting ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100 animate-slide-down'
        }`}
      >
        {/* Cord */}
        <div className="w-1 h-20 bg-stone-700 shadow-xs" />

        {/* Lamp Shade */}
        <div className="relative flex flex-col items-center">
          {/* Socket */}
          <div className="w-6 h-3 bg-stone-800 rounded-t-sm" />

          {/* Metal Cone Shade */}
          <div
            className="w-24 h-11 bg-gradient-to-b from-stone-800 to-stone-900 rounded-t-xl border-t border-stone-600 shadow-xl relative"
            style={{
              clipPath: 'polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)',
            }}
          />

          {/* Glowing Filament Bulb */}
          <div
            className={`w-8 h-8 rounded-full -mt-2.5 transition-all duration-100 ${
              isLightOn
                ? 'bg-amber-100 shadow-[0_0_45px_20px_rgba(251,191,36,0.95)] scale-110'
                : 'bg-stone-600 opacity-40 scale-95'
            }`}
          />

          {/* Pull Chain */}
          <div className="absolute top-7 right-3 flex flex-col items-center">
            <div className="w-0.5 h-12 bg-amber-600/80 border-r border-amber-300" />
            <div className="w-2 h-2 rounded-full bg-amber-400 shadow-xs" />
          </div>
        </div>
      </div>
    </div>
  );
}
