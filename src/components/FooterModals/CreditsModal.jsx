import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, X, Heart } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function CreditsModal({ onClose }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900">{t('credits_title')}</h2>
          </div>

          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs font-semibold text-slate-600">
          <p>{t('credits_desc')}</p>
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl font-bold text-indigo-900 text-center">
            {t('credits_tech')}
          </div>
          <div className="flex items-center justify-center space-x-1 text-pink-600 font-extrabold text-center">
            <Heart className="w-4 h-4 fill-current" />
            <span>Made with passion for drawing lovers worldwide.</span>
          </div>
        </div>

        <button
          onClick={() => { soundEngine.playClick(); onClose(); }}
          className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition"
        >
          OK
        </button>
      </div>
    </div>
  );
}
