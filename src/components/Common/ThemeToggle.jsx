import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2.5 rounded-2xl border transition flex items-center justify-center touch-manipulation active:scale-95 group shadow-2xs ${
        isDark
          ? 'bg-[#1c232d] border-[#333e4d] text-amber-400 hover:bg-[#252f3d] hover:border-amber-400/60'
          : 'bg-white border-[#e5e0d5] text-amber-600 hover:bg-[#faf8f3] hover:border-amber-500'
      } ${className}`}
      title={isDark ? 'Váltás világos témára (Nap ☀️)' : 'Váltás sötét témára (Hold 🌙)'}
    >
      {isDark ? (
        <Sun className="w-4.5 h-4.5 group-hover:rotate-45 transition-transform text-amber-400 fill-amber-400/20" />
      ) : (
        <Moon className="w-4.5 h-4.5 group-hover:-rotate-12 transition-transform text-stone-700 fill-stone-700/10" />
      )}
    </button>
  );
}
