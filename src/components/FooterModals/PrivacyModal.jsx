import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ShieldCheck, X, Trash2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function PrivacyModal({ onClose }) {
  const { t } = useLanguage();
  const [clearedMessage, setClearedMessage] = useState('');

  const handleClearData = () => {
    soundEngine.playClick();
    localStorage.removeItem('drawitout_name');
    localStorage.removeItem('drawitout_avatar');
    localStorage.removeItem('drawitout_lang');
    setClearedMessage('✅ Helyi adatok sikeresen törölve!');
    setTimeout(() => setClearedMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-black text-slate-900">{t('privacy_title')}</h2>
          </div>

          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs font-semibold text-slate-600">
          <p>{t('privacy_desc')}</p>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <p>{t('privacy_local_storage')}</p>
            <button
              onClick={handleClearData}
              className="py-2 px-3 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold transition flex items-center space-x-1.5 border border-rose-300"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t('privacy_reset_btn')}</span>
            </button>
            {clearedMessage && (
              <p className="text-emerald-700 font-extrabold">{clearedMessage}</p>
            )}
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
