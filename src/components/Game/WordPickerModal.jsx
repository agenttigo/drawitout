import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function WordPickerModal({ wordChoices = [], onSelectWord }) {
  const { t } = useLanguage();

  const getDifficultyBadge = (word) => {
    if (word.length <= 4) return { label: t('difficulty_easy'), bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
    if (word.length <= 7) return { label: t('difficulty_medium'), bg: 'bg-amber-100 text-amber-800 border-amber-300' };
    return { label: t('difficulty_hard'), bg: 'bg-rose-100 text-rose-800 border-rose-300' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6 text-center">
        <div className="flex flex-col items-center space-y-2">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 animate-bounce">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900">
            {t('word_picker_title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {wordChoices.map((word) => {
            const badge = getDifficultyBadge(word);

            return (
              <button
                key={word}
                onClick={() => {
                  soundEngine.playClick();
                  onSelectWord(word);
                }}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-500 shadow-md hover:shadow-xl transition-all duration-200 hover:-translate-y-1 flex flex-col items-center justify-between space-y-3 group"
              >
                <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${badge.bg}`}>
                  {badge.label}
                </span>

                <span className="text-lg font-black text-slate-800 group-hover:text-indigo-700 uppercase tracking-wide">
                  {word}
                </span>

                <span className="text-[11px] font-extrabold text-indigo-600 opacity-0 group-hover:opacity-100 transition">
                  Kiválasztás ✨
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
