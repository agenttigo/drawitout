import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { FileText, X } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function TermsModal({ onClose }) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <FileText className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900">{t('terms_title')}</h2>
          </div>

          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 text-xs text-slate-600 font-semibold leading-relaxed pr-1 custom-scrollbar">
          <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl">{t('terms_text_1')}</p>
          <p className="p-3 bg-slate-50 border border-slate-200 rounded-xl">{t('terms_text_2')}</p>
          <p className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl font-bold">{t('terms_text_3')}</p>
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
