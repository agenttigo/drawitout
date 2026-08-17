import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Clock, CheckCircle } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function WordPickerModal({ wordChoices = [], onSelectWord, timeLeft = 15 }) {
  const { t } = useLanguage();

  const getDifficultyBadge = (word) => {
    if (word.length <= 6) return { label: t('difficulty_easy'), bg: 'bg-[#eaf2eb] text-[#2c5234] border-[#c7decb]' };
    if (word.length <= 12) return { label: t('difficulty_medium'), bg: 'bg-[#fff8eb] text-[#9c6615] border-[#f5e3bc]' };
    return { label: t('difficulty_hard'), bg: 'bg-[#fdf0f0] text-[#9e2a2b] border-[#f4c2c2]' };
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-5 md:p-8 border-2 border-[#386641] text-[#1e242b] bg-white relative shadow-2xl space-y-4 md:space-y-6 text-center">
        <div className="flex flex-col items-center space-y-1.5">
          <div className="p-3 bg-[#eaf2eb] rounded-2xl text-[#386641] shadow-2xs animate-bounce">
            <Sparkles className="w-7 h-7" />
          </div>

          <h2 className="text-xl md:text-2xl font-black text-[#1e242b]">
            {t('word_picker_title')}
          </h2>

          {/* 15s Countdown Pill */}
          <div className="flex items-center space-x-1.5 px-3.5 py-1 bg-[#fff8eb] border border-[#f5e3bc] text-[#9c6615] rounded-full text-xs font-black shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-[#c86d3b] animate-pulse" />
            <span>Válassz szót: <strong className="text-base text-[#c86d3b]">{timeLeft}s</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 pt-1">
          {wordChoices.map((word) => {
            const badge = getDifficultyBadge(word);

            return (
              <button
                key={word}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  onSelectWord(word);
                }}
                className="p-4 md:p-5 rounded-2xl bg-[#faf8f3] hover:bg-[#eaf2eb] border-2 border-[#e5e0d5] hover:border-[#386641] shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col items-center justify-between space-y-2.5 group touch-manipulation active:scale-95"
              >
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badge.bg}`}>
                  {badge.label}
                </span>

                <span className="text-base md:text-lg font-black text-[#1e242b] group-hover:text-[#386641] uppercase tracking-wide">
                  {word}
                </span>

                <span className="text-xs font-bold text-[#386641] flex items-center space-x-1">
                  <span>{t('select_word_btn')}</span>
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
