import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSelector } from '../Common/LanguageSelector';
import { ThemeToggle } from '../Common/ThemeToggle';
import { Clock, LogOut } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function Header({
  roomCode,
  currentRound,
  maxRounds,
  maskedWord,
  timeLeft,
  drawTime,
  isDrawer,
  secretWord,
  onLeaveRoom,
}) {
  const { t } = useLanguage();
  const { isDark } = useTheme();
  const timeRatio = drawTime ? timeLeft / drawTime : 1;

  let timerColorClass = 'text-[#2c5234] dark:text-[#52a061] bg-[#eaf2eb] dark:bg-[#1f3323] border-[#c7decb] dark:border-[#2e5936]';
  if (timeLeft > 0) {
    if (timeRatio <= 0.25) {
      timerColorClass = 'text-[#9e2a2b] dark:text-[#f87171] bg-[#fdf0f0] dark:bg-[#3d1a1a] border-[#f4c2c2] dark:border-[#7a2e2e] animate-bounce';
    } else if (timeRatio <= 0.5) {
      timerColorClass = 'text-[#9c6615] dark:text-[#fbbf24] bg-[#fff8eb] dark:bg-[#3d2c1e] border-[#f5e3bc] dark:border-[#784f1a]';
    }
  }

  return (
    <div className="w-full glass-panel rounded-2xl p-2.5 md:p-4 flex items-center justify-between gap-2 md:gap-4 border border-[#e5e0d5] dark:border-[#333e4d] shadow-sm bg-white dark:bg-[#161b22] text-[#1e242b] dark:text-[#f1f5f9] animate-fade-in">
      {/* Left: App Brand & Room Code & Round */}
      <div className="flex items-center space-x-1.5 md:space-x-3 flex-shrink-0">
        <div className="flex items-center">
          <img src="/favicon.svg" alt="DrawItOut Logo" className="sm:hidden w-7 h-7" />
          <img
            src={isDark ? '/logo-dark.svg' : '/logo-light.svg'}
            alt="DrawItOut Logo"
            className="hidden sm:block w-28 md:w-36 h-auto"
          />
        </div>

        <div className="bg-[#f0ebe1] dark:bg-[#212833] px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-[#dcd5c8] dark:border-[#333e4d] text-[11px] md:text-xs font-bold text-[#2c333a] dark:text-stone-300 tracking-wider">
          #{roomCode}
        </div>

        <div className="flex items-center space-x-1 text-[11px] md:text-xs font-semibold text-stone-600 dark:text-stone-400 bg-stone-50 dark:bg-[#1c232d] px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-stone-200 dark:border-[#333e4d]">
          <span className="hidden sm:inline">{t('round')}</span>
          <span className="text-[#386641] dark:text-[#52a061] font-bold">{currentRound}</span>
          <span>/</span>
          <span>{maxRounds}</span>
        </div>
      </div>

      {/* Center: Secret Word or Masked Hint Display */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 px-1">
        {isDrawer ? (
          <div className="flex items-center space-x-1.5 md:space-x-2 bg-[#f9f6f0] dark:bg-[#1c232d] border border-[#e5e0d5] dark:border-[#333e4d] px-2.5 py-1 md:px-4 md:py-1.5 rounded-xl md:rounded-2xl shadow-2xs max-w-full truncate">
            <span className="text-[10px] md:text-xs font-bold text-stone-600 dark:text-stone-400 hidden xs:inline">{t('secret_word_drawer')}</span>
            <span className="text-sm md:text-lg font-black text-[#386641] dark:text-[#52a061] uppercase tracking-wide truncate">
              {secretWord || '...'}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-0.5 max-w-full">
            <span className="text-[9px] md:text-[10px] uppercase font-bold text-stone-400 tracking-wider hidden sm:block">
              {t('secret_word_spectator')}
            </span>
            <span className="text-base md:text-2xl font-black text-[#1e242b] dark:text-white tracking-[0.18em] md:tracking-[0.25em] font-mono truncate max-w-full text-center">
              {maskedWord || '_ _ _ _ _'}
            </span>
          </div>
        )}
      </div>

      {/* Right: Timer or Waiting Status, Theme, Language & Leave */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
        <div className={`px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-xl border font-bold text-xs md:text-sm flex items-center space-x-1 md:space-x-1.5 transition-colors ${timerColorClass}`}>
          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>{timeLeft > 0 ? `${timeLeft}s` : t('waiting_status')}</span>
        </div>

        <div className="hidden sm:flex items-center space-x-1">
          <ThemeToggle />
          <LanguageSelector />
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onLeaveRoom();
          }}
          className="p-1.5 md:px-3 md:py-2 rounded-xl bg-stone-100 dark:bg-[#1c232d] hover:bg-stone-200 dark:hover:bg-[#252f3d] text-stone-600 dark:text-stone-300 hover:text-stone-900 border border-stone-200 dark:border-[#333e4d] transition text-xs font-bold flex items-center space-x-1 touch-manipulation"
          title={t('leave_room')}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">{t('leave_room')}</span>
        </button>
      </div>
    </div>
  );
}
