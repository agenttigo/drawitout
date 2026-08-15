import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../../context/LanguageContext';
import { Trophy, Image as ImageIcon, Home, Star } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { AvatarRenderer } from '../../utils/avatarGenerator';

export function PodiumModal({ leaderboard = [], gallery = [], onReturnLobby }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('podium');

  useEffect(() => {
    soundEngine.playVictory();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
  }, []);

  const winner = leaderboard[0];
  const second = leaderboard[1];
  const third = leaderboard[2];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6">
        {/* Navigation Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="text-2xl font-black text-slate-900 flex items-center space-x-2">
            <Trophy className="w-7 h-7 text-amber-500" />
            <span>{t('podium_title')}</span>
          </h2>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 space-x-1 text-xs font-extrabold">
            <button
              onClick={() => { soundEngine.playClick(); setActiveTab('podium'); }}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'podium' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pódium 🏆
            </button>
            <button
              onClick={() => { soundEngine.playClick(); setActiveTab('gallery'); }}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'gallery' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('match_gallery')} ({gallery.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'podium' ? (
          <div className="space-y-6">
            {/* Top 3 Podium Cards */}
            <div className="flex justify-center items-end space-x-4 pt-6">
              {/* 2nd Place */}
              {second && (
                <div className="flex flex-col items-center space-y-2">
                  <AvatarRenderer avatar={second.avatar} size={64} />
                  <div className="p-3 bg-slate-100 rounded-2xl border border-slate-300 w-28 text-center shadow-md">
                    <span className="text-xl">🥈</span>
                    <h4 className="font-extrabold text-xs text-slate-900 truncate">{second.name}</h4>
                    <span className="text-xs font-black text-indigo-600">{second.score} pt</span>
                  </div>
                </div>
              )}

              {/* 1st Place Winner */}
              {winner && (
                <div className="flex flex-col items-center space-y-2 scale-110 -translate-y-2">
                  <AvatarRenderer avatar={winner.avatar} size={80} />
                  <div className="p-4 bg-amber-100 border-2 border-amber-400 rounded-2xl w-32 text-center shadow-xl">
                    <span className="text-3xl">🥇</span>
                    <h3 className="font-black text-sm text-slate-900 truncate">{winner.name}</h3>
                    <span className="text-sm font-black text-amber-700">{winner.score} pt</span>
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {third && (
                <div className="flex flex-col items-center space-y-2">
                  <AvatarRenderer avatar={third.avatar} size={64} />
                  <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 w-28 text-center shadow-md">
                    <span className="text-xl">🥉</span>
                    <h4 className="font-extrabold text-xs text-slate-900 truncate">{third.name}</h4>
                    <span className="text-xs font-black text-indigo-600">{third.score} pt</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[320px] overflow-y-auto pr-1">
            {gallery.map((art) => (
              <div key={art.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-700 flex justify-between">
                  <span>{art.drawerName}</span>
                  <span className="text-indigo-600 uppercase">"{art.word}"</span>
                </div>
                <div className="w-full aspect-[4/3] bg-white rounded-xl border border-slate-300 flex items-center justify-center text-xs text-slate-400 italic">
                  🎨 Kép
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Button */}
        <button
          onClick={() => { soundEngine.playClick(); onReturnLobby(); }}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center space-x-2"
        >
          <Home className="w-4 h-4" />
          <span>{t('back_to_lobby')}</span>
        </button>
      </div>
    </div>
  );
}
