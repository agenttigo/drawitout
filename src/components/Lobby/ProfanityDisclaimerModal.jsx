import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AlertTriangle, X, ShieldAlert, Check } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function ProfanityDisclaimerModal({ onAccept, onCancel }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-amber-400 text-slate-800 bg-white relative shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-amber-200 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 animate-bounce">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-amber-900">
                {t('disclaimer_title')}
              </h2>
            </div>
          </div>

          <button
            onClick={() => { soundEngine.playClick(); onCancel(); }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Text */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-3">
          <p className="text-xs md:text-sm text-amber-950 font-bold leading-relaxed">
            {t('disclaimer_text')}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => { soundEngine.playClick(); onCancel(); }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition border border-slate-300"
          >
            {t('disclaimer_cancel')}
          </button>

          <button
            type="button"
            onClick={() => { soundEngine.playClick(); onAccept(); }}
            className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-lg shadow-amber-500/30 transition flex items-center justify-center space-x-1.5"
          >
            <Check className="w-4 h-4" />
            <span>{t('disclaimer_accept')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
