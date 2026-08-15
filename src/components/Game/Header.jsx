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
    <div className="w-full glass-panel rounded-2xl p-3 md:p-4 flex items-center justify-between gap-4 border border-[#e5e0d5] shadow-sm bg-white text-[#1e242b] animate-fade-in">
      {/* Left: App Brand & Room Code */}
      <div className="flex items-center space-x-3">
        <div className="hidden sm:block w-28 md:w-36">
          <img src="/logo-light.svg" alt="DrawItOut Logo" className="w-full h-auto" />
        </div>

        <div className="bg-[#f0ebe1] px-3 py-1.5 rounded-xl border border-[#dcd5c8] text-xs font-bold text-[#2c333a] tracking-wider">
          #{roomCode}
        </div>

        <div className="hidden md:flex items-center space-x-1.5 text-xs font-semibold text-stone-600 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
          <span>{t('round')}</span>
          <span className="text-[#386641] font-bold">{currentRound}</span>
          <span>/</span>
          <span>{maxRounds}</span>
        </div>
      </div>

      {/* Center: Secret Word or Masked Hint Display */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {isDrawer ? (
          <div className="flex items-center space-x-2 bg-[#f9f6f0] border border-[#e5e0d5] px-4 py-1.5 rounded-2xl shadow-2xs">
            <span className="text-xs font-bold text-stone-600">{t('secret_word_drawer')}</span>
            <span className="text-base md:text-lg font-black text-[#386641] uppercase tracking-wide">
              {secretWord || '...'}
            </span>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-0.5">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
              {t('secret_word_spectator')}
            </span>
            <span className="text-lg md:text-2xl font-black text-[#1e242b] tracking-[0.25em] font-mono">
              {maskedWord || '_ _ _ _ _'}
            </span>
          </div>
        )}
      </div>

      {/* Right: Timer or Waiting Status, Language Selector & Leave Button */}
      <div className="flex items-center space-x-2">
        <div className={`px-3.5 py-1.5 rounded-xl border font-bold text-xs md:text-sm flex items-center space-x-1.5 transition-colors ${timerColorClass}`}>
          <Clock className="w-4 h-4" />
          <span>{timeLeft > 0 ? `${timeLeft}s` : t('waiting_status')}</span>
        </div>

        <LanguageSelector />

        <button
          onClick={() => {
            soundEngine.playClick();
            onLeaveRoom();
          }}
          className="p-2 md:px-3 md:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 border border-stone-200 transition text-xs font-bold flex items-center space-x-1"
          title={t('leave_room')}
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden md:inline">{t('leave_room')}</span>
        </button>
      </div>
    </div>
  );
}
