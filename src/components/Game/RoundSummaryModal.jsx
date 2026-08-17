import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Star, Trophy, Clock, X, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function RoundSummaryModal({ secretWord, players = [], onRateArtwork, onClose }) {
  const { t } = useLanguage();
  const [ratedStars, setRatedStars] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Rock-solid 3-second countdown that NEVER gets canceled on re-renders
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onCloseRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleStarClick = (stars) => {
    soundEngine.playClick();
    setRatedStars(stars);
    onRateArtwork?.(stars);
  };

  const handleManualClose = () => {
    soundEngine.playClick();
    onCloseRef.current?.();
  };

  const sortedByRoundScore = [...players].sort((a, b) => (b.roundScore || 0) - (a.roundScore || 0));

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleManualClose();
        }
      }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-4 bg-stone-900/65 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg glass-panel rounded-3xl p-5 md:p-8 border-2 border-[#c7decb] text-[#1e242b] bg-white relative shadow-2xl space-y-4 md:space-y-5 text-center">
        {/* Explicit Close Button (X) */}
        <button
          type="button"
          onClick={handleManualClose}
          className="absolute top-3.5 right-3.5 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition touch-manipulation active:scale-95"
          title="Bezárás"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1.5 pt-1">
          <div className="p-3 bg-[#eaf2eb] rounded-2xl text-[#386641] inline-block shadow-2xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <h2 className="text-xl md:text-2xl font-black text-[#1e242b]">{t('round_summary_title')}</h2>
          <p className="text-xs text-stone-500 font-bold">{t('secret_word_was')}</p>
          <div className="text-xl md:text-2xl font-black text-[#386641] uppercase tracking-wider bg-[#eaf2eb] py-2 px-6 rounded-2xl border border-[#c7decb] inline-block shadow-2xs">
            "{secretWord}"
          </div>
        </div>

        {/* Rating Stars Bar */}
        <div className="bg-[#faf8f3] p-3 rounded-2xl border border-[#e5e0d5] space-y-1.5">
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
        <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
          {sortedByRoundScore.map((player) => (
            <div
              key={player.id}
              className="p-2 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs font-bold"
            >
              <span className="text-stone-700">{player.name}</span>
              <span className="text-[#386641] font-black">+{player.roundScore || 0} pt</span>
            </div>
          ))}
        </div>

        {/* Live Countdown & Manual Skip Button */}
        <div className="pt-2 border-t border-stone-200 flex items-center justify-between gap-2">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-stone-500">
            <Clock className="w-3.5 h-3.5 text-[#386641] animate-spin-slow" />
            <span>Következő kör: <strong className="text-[#386641]">{timeLeft}s</strong></span>
          </div>

          <button
            type="button"
            onClick={handleManualClose}
            className="px-3.5 py-1.5 rounded-xl bg-[#386641] hover:bg-[#2d5234] text-white text-xs font-bold flex items-center space-x-1 shadow-xs transition touch-manipulation active:scale-95"
          >
            <span>Tovább</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
