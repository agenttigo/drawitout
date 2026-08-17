import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Heart, ShieldCheck, Zap, Palette, Film } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function AboutModal({ onClose }) {
  const { lang, t } = useLanguage();

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-[#e5e0d5] dark:border-[#333e4d] text-[#1e242b] dark:text-[#f1f5f9] bg-white dark:bg-[#1c232d] relative shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-[#fdf0ed] dark:bg-[#3d241c] text-[#c86d3b] dark:text-[#ea7a3e]">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-[#1e242b] dark:text-white">{t('about_us')}</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-bold">{t('about_subtitle')}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Highlights */}
        <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300 font-medium leading-relaxed">
          <div className="p-4 bg-[#faf8f3] dark:bg-[#161b22] border border-[#e5e0d5] dark:border-[#333e4d] rounded-2xl flex items-start space-x-3 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-[#386641] dark:text-[#52a061] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-[#1e242b] dark:text-white text-sm mb-0.5">
                {t('about_box1_title')}
              </h4>
              <p className="text-stone-500 dark:text-stone-400 leading-snug">
                {t('about_box1_desc')}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#faf8f3] dark:bg-[#161b22] border border-[#e5e0d5] dark:border-[#333e4d] rounded-2xl flex items-start space-x-3 shadow-2xs">
            <Zap className="w-5 h-5 text-[#c86d3b] dark:text-[#ea7a3e] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-[#1e242b] dark:text-white text-sm mb-0.5">
                {t('about_box2_title')}
              </h4>
              <p className="text-stone-500 dark:text-stone-400 leading-snug">
                {t('about_box2_desc')}
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#faf8f3] dark:bg-[#161b22] border border-[#e5e0d5] dark:border-[#333e4d] rounded-2xl flex items-start space-x-3 shadow-2xs">
            <Film className="w-5 h-5 text-[#386641] dark:text-[#52a061] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-[#1e242b] dark:text-white text-sm mb-0.5">
                {t('about_box3_title')}
              </h4>
              <p className="text-stone-500 dark:text-stone-400 leading-snug">
                {t('about_box3_desc')}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="w-full py-3.5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-extrabold text-xs shadow-md transition touch-manipulation"
          >
            {t('btn_start_now')}
          </button>
        </div>
      </div>
    </div>
  );
}
