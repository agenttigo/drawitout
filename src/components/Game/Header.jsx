import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../Common/LanguageSelector';
import { Clock, Eye, Sparkles, LogOut, ShieldAlert } from 'lucide-react';
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
  const timeRatio = drawTime ? timeLeft / drawTime : 1;

  let timerColorClass = 'text-[#2c5234] bg-[#eaf2eb] border-[#c7decb]';
  if (timeLeft > 0) {
    if (timeRatio <= 0.25) {
      timerColorClass = 'text-[#9e2a2b] bg-[#fdf0f0] border-[#f4c2c2] animate-bounce';
    } else if (timeRatio <= 0.5) {
      timerColorClass = 'text-[#9c6615] bg-[#fff8eb] border-[#f5e3bc]';
    }
  }

  return (
    <div className="w-full glass-panel rounded-2xl p-2.5 md:p-4 flex items-center justify-between gap-2 md:gap-4 border border-[#e5e0d5] shadow-sm bg-white text-[#1e242b] animate-fade-in">
      {/* Left: App Brand & Room Code & Round */}
      <div className="flex items-center space-x-1.5 md:space-x-3 flex-shrink-0">
        <div className="hidden sm:block w-24 md:w-36">
          <img src="/logo-light.svg" alt="DrawItOut Logo" className="w-full h-auto" />
        </div>

        <div className="bg-[#f0ebe1] px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-[#dcd5c8] text-[11px] md:text-xs font-bold text-[#2c333a] tracking-wider">
          #{roomCode}
        </div>

        <div className="flex items-center space-x-1 text-[11px] md:text-xs font-semibold text-stone-600 bg-stone-50 px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-stone-200">
          <span className="hidden sm:inline">{t('round')}</span>
          <span className="text-[#386641] font-bold">{currentRound}</span>
          <span>/</span>
          <span>{maxRounds}</span>
        </div>
      </div>

      {/* Center: Secret Word or Masked Hint Display */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 px-1">
        {isDrawer ? (
          <div className="flex items-center space-x-1.5 md:space-x-2 bg-[#f9f6f0] border border-[#e5e0d5] px-2.5 py-1 md:px-4 md:py-1.5 rounded-xl md:rounded-2xl shadow-2xs max-w-full truncate">
            <span className="text-[10px] md:text-xs font-bold text-stone-600 hidden xs:inline">{t('secret_word_drawer')}</span>
            <span className="text-sm md:text-lg font-black text-[#386641] uppercase tracking-wide truncate">
              {secretWord || '...'}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-0.5 max-w-full">
            <span className="text-[9px] md:text-[10px] uppercase font-bold text-stone-400 tracking-wider hidden sm:block">
              {t('secret_word_spectator')}
            </span>
            <span className="text-base md:text-2xl font-black text-[#1e242b] tracking-[0.18em] md:tracking-[0.25em] font-mono truncate max-w-full text-center">
              {maskedWord || '_ _ _ _ _'}
            </span>
          </div>
        )}
      </div>

      {/* Right: Timer or Waiting Status, Language Selector & Leave Button */}
      <div className="flex items-center space-x-1 md:space-x-2 flex-shrink-0">
        <div className={`px-2.5 py-1 md:px-3.5 md:py-1.5 rounded-xl border font-bold text-xs md:text-sm flex items-center space-x-1 md:space-x-1.5 transition-colors ${timerColorClass}`}>
          <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span>{timeLeft > 0 ? `${timeLeft}s` : t('waiting_status')}</span>
        </div>

        <div className="hidden sm:block">
          <LanguageSelector />
        </div>

        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onLeaveRoom();
          }}
          className="p-1.5 md:px-3 md:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border border-stone-200 transition text-xs font-bold flex items-center space-x-1 touch-manipulation"
          title={t('leave_room')}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">{t('leave_room')}</span>
        </button>
      </div>
    </div>
  );
}
