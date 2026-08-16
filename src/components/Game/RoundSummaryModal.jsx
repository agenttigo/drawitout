import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Star, Trophy, Clock } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function RoundSummaryModal({ secretWord, players = [], onRateArtwork, onClose }) {
  const { t } = useLanguage();
  const [ratedStars, setRatedStars] = useState(0);

  // Auto-close after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const handleStarClick = (stars) => {
    soundEngine.playClick();
    setRatedStars(stars);
    onRateArtwork(stars);
  };

  const sortedByRoundScore = [...players].sort((a, b) => (b.roundScore || 0) - (a.roundScore || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-5 md:p-8 border border-[#e5e0d5] text-[#1e242b] bg-white relative shadow-2xl space-y-4 md:space-y-5 text-center">
        <div className="space-y-1.5">
          <div className="p-3 bg-[#eaf2eb] rounded-2xl text-[#386641] inline-block shadow-2xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#1e242b]">{t('round_summary_title')}</h2>
          <p className="text-xs text-stone-500 font-semibold">{t('secret_word_was')}</p>
          <div className="text-xl md:text-2xl font-black text-[#386641] uppercase tracking-wider bg-[#eaf2eb] py-2 px-6 rounded-2xl border border-[#c7decb] inline-block shadow-2xs">
            "{secretWord}"
          </div>
        </div>

        {/* Rating Stars Bar */}
        <div className="bg-[#faf8f3] p-3.5 rounded-2xl border border-[#e5e0d5] space-y-1.5">
          <span className="text-xs font-bold text-stone-600">{t('rate_artwork')}</span>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleStarClick(star)}
                className={`p-1.5 transition-transform touch-manipulation active:scale-95 ${
                  star <= ratedStars ? 'text-[#e9c46a] scale-125' : 'text-stone-300 hover:text-[#e9c46a]'
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Score Gains List */}
        <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
          {sortedByRoundScore.map((player) => (
            <div
              key={player.id}
              className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-bold"
            >
              <span className="text-stone-700">{player.name}</span>
              <span className="text-[#386641] font-black">+{player.roundScore || 0} pt</span>
            </div>
          ))}
        </div>

        {/* Next Turn Countdown Toast */}
        <div className="pt-2 border-t border-stone-200 flex items-center justify-center space-x-1.5 text-xs font-bold text-stone-500">
          <Clock className="w-3.5 h-3.5 text-[#386641] animate-spin-slow" />
          <span>A következő kör azonnal indul...</span>
        </div>
      </div>
    </div>
  );
}
