import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { BADGES, getUnlockedBadges, checkDailyAndHourlyBadges } from '../../utils/achievementSystem';
import { Trophy, CheckCircle, Lock, X, Sparkles, Filter, Award } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function AchievementsModal({ onClose }) {
  const { t } = useLanguage();
  const [filter, setFilter] = useState('all'); // 'all', 'unlocked', 'locked'
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    checkDailyAndHourlyBadges();
  }, []);

  const unlocked = getUnlockedBadges();
  const allBadges = Object.values(BADGES);
  const totalCount = allBadges.length;
  const progressPercent = Math.round((unlocked.length / totalCount) * 100);

  const categories = [
    { id: 'all', label: t('achievements_filter_all') || 'Összes' },
    { id: 'mastery', label: t('achievements_cat_mastery') || '🏆 Bajnokság' },
    { id: 'speed', label: t('achievements_cat_speed') || '⚡ Gyorsaság' },
    { id: 'loyalty', label: t('achievements_cat_loyalty') || '📅 Hűség' },
    { id: 'perseverance', label: t('achievements_cat_perseverance') || '🧗 Kitartás' },
    { id: 'drawing', label: t('achievements_cat_drawing') || '🎨 Művészet' },
    { id: 'studio', label: t('achievements_cat_studio') || '🎬 Stúdió' },
    { id: 'social', label: t('achievements_cat_social') || '🌍 Közösség' },
  ];

  const displayedBadges = allBadges.filter((badge) => {
    const isUnlocked = unlocked.includes(badge.id);
    if (filter === 'unlocked' && !isUnlocked) return false;
    if (filter === 'locked' && isUnlocked) return false;
    if (selectedCategory !== 'all' && badge.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-5 sm:p-7 border-2 border-[#e5e0d5] dark:border-[#2d3848] text-[#1e242b] dark:text-[#f1f5f9] bg-white/95 dark:bg-[#181f28]/95 relative shadow-2xl space-y-4 max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#253140] transition touch-manipulation"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Level Progress */}
        <div className="flex items-center space-x-3.5 pr-8 shrink-0">
          <div className="p-3 bg-[#fff8eb] dark:bg-[#3d2c1e] rounded-2xl text-[#c86d3b] dark:text-[#fb923c] shadow-2xs">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-black text-[#1e242b] dark:text-white tracking-tight">
                {t('achievements_title')}
              </h2>
              <span className="text-xs font-black text-[#386641] dark:text-[#6ee7b7] bg-[#eaf2eb] dark:bg-[#203426] px-2.5 py-0.5 rounded-full border border-[#c7decb] dark:border-[#2e5936]">
                {unlocked.length} / {totalCount} ({progressPercent}%)
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-stone-100 dark:bg-[#141b24] h-2.5 rounded-full mt-2 overflow-hidden border border-stone-200 dark:border-[#2d3848]">
              <div
                className="bg-gradient-to-r from-[#386641] via-[#52a061] to-[#e9c46a] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-stone-200 dark:border-[#2d3848] pb-2.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition touch-manipulation ${
              filter === 'all'
                ? 'bg-[#386641] text-white shadow-2xs'
                : 'bg-stone-100 dark:bg-[#253140] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2e3e52]'
            }`}
          >
            {t('achievements_filter_all')} ({totalCount})
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter('unlocked');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition touch-manipulation ${
              filter === 'unlocked'
                ? 'bg-[#386641] text-white shadow-2xs'
                : 'bg-stone-100 dark:bg-[#253140] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2e3e52]'
            }`}
          >
            {t('achievements_filter_unlocked')} ({unlocked.length})
          </button>
          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              setFilter('locked');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition touch-manipulation ${
              filter === 'locked'
                ? 'bg-[#386641] text-white shadow-2xs'
                : 'bg-stone-100 dark:bg-[#253140] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2e3e52]'
            }`}
          >
            {t('achievements_filter_locked')} ({totalCount - unlocked.length})
          </button>
        </div>

        {/* Category Pills Slider */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                soundEngine.playClick();
                setSelectedCategory(cat.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold whitespace-nowrap transition touch-manipulation ${
                selectedCategory === cat.id
                  ? 'bg-[#c86d3b] text-white shadow-2xs'
                  : 'bg-stone-100/80 dark:bg-[#1f2937] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#2e3e52] border border-stone-200 dark:border-[#374151]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Badges Scrollable Grid List */}
        <div className="space-y-2 overflow-y-auto pr-1 flex-1 custom-scrollbar min-h-0">
          {displayedBadges.length === 0 ? (
            <div className="p-8 text-center text-stone-400 dark:text-stone-500 font-bold text-xs">
              Nincs megjeleníthető jelvény ebben a szűrésben.
            </div>
          ) : (
            displayedBadges.map((badge) => {
              const isUnlocked = unlocked.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isUnlocked
                      ? 'bg-[#eaf2eb]/80 dark:bg-[#203426]/60 border-[#b8d6be] dark:border-[#2e5936] shadow-xs'
                      : 'bg-stone-50/70 dark:bg-[#141b24]/70 border-stone-200 dark:border-[#2d3848] opacity-65'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                        isUnlocked
                          ? 'bg-white dark:bg-[#253140] shadow-xs'
                          : 'bg-stone-200/80 dark:bg-[#1f2937] grayscale'
                      }`}
                    >
                      {badge.icon}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-xs sm:text-sm font-black text-[#1e242b] dark:text-white truncate">
                          {t(badge.key_title)}
                        </h4>
                      </div>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 font-semibold mt-0.5 leading-snug">
                        {t(badge.key_desc)}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isUnlocked ? (
                      <span className="p-1.5 bg-[#386641] text-white rounded-xl shadow-2xs inline-flex items-center justify-center">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                    ) : (
                      <span className="p-1.5 bg-stone-200 dark:bg-[#253140] text-stone-500 dark:text-stone-400 rounded-xl inline-flex items-center justify-center">
                        <Lock className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
