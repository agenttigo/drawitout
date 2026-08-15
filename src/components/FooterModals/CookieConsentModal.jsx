import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Cookie, ShieldCheck, Check, Info } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function CookieConsentModal({ onAccept, onOpenPrivacy }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-300 text-slate-800 bg-white relative shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-slate-200 pb-4">
          <div className="p-3 rounded-2xl bg-amber-100 text-amber-700 animate-bounce">
            <Cookie className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              {t('cookie_consent_title')}
            </h2>
          </div>
        </div>

        {/* Text Body */}
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-3 text-xs md:text-sm text-indigo-950 font-medium leading-relaxed">
          <p>{t('cookie_consent_text')}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={() => { soundEngine.playClick(); onOpenPrivacy(); }}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition border border-slate-300 flex items-center justify-center space-x-1.5"
          >
            <Info className="w-4 h-4 text-slate-500" />
            <span>{t('cookie_more_info')}</span>
          </button>

          <button
            type="button"
            onClick={() => { soundEngine.playClick(); onAccept(); }}
            className="flex-1 py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-lg shadow-indigo-600/30 transition flex items-center justify-center space-x-2"
          >
            <Check className="w-4.5 h-4.5" />
            <span>{t('cookie_accept_all')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
