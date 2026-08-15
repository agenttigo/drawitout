import React from 'react';

export function ReactionOverlay({ reactions = [] }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {reactions.map((r) => (
        <div
          key={r.id}
          className="absolute animate-fly-up flex flex-col items-center drop-shadow-lg"
          style={{ left: `${r.x}%`, bottom: '10%' }}
        >
          <span className="text-3xl md:text-4xl">{r.emoji}</span>
          <span className="text-[10px] font-extrabold text-white bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-700">
            {r.senderName}
          </span>
        </div>
      ))}
    </div>
  );
}
