import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Star, Trophy } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function RoundSummaryModal({ secretWord, players = [], onRateArtwork }) {
  const { t } = useLanguage();
  const [ratedStars, setRatedStars] = useState(0);

  const handleStarClick = (stars) => {
    soundEngine.playClick();
    setRatedStars(stars);
    onRateArtwork(stars);
  };

  const sortedByRoundScore = [...players].sort((a, b) => (b.roundScore || 0) - (a.roundScore || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6 text-center">
        <div className="space-y-2">
          <div className="p-3 bg-amber-100 rounded-full text-amber-600 inline-block">
            <Sparkles className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">{t('round_summary_title')}</h2>
          <p className="text-xs text-slate-500 font-bold">{t('secret_word_was')}</p>
          <div className="text-2xl font-black text-indigo-600 uppercase tracking-wider bg-indigo-50 py-2 rounded-2xl border border-indigo-200 inline-block px-6">
            "{secretWord}"
          </div>
        </div>

        {/* Rating Stars Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-600">{t('rate_artwork')}</span>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                className={`p-2 transition-transform ${
                  star <= ratedStars ? 'text-amber-500 scale-125' : 'text-slate-300 hover:text-amber-400'
                }`}
              >
                <Star className="w-6 h-6 fill-current" />
              </button>
            ))}
          </div>
        </div>

        {/* Score Gains List */}
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {sortedByRoundScore.map((player) => (
            <div
              key={player.id}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-bold"
            >
              <span>{player.name}</span>
              <span className="text-emerald-600 font-black">+{player.roundScore || 0} pt</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
