import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { soundEngine } from '../../utils/soundEngine';

export function LanguageSelector({ className = '' }) {
  const { lang, setLang } = useLanguage();

  const handleSelect = (newLang) => {
    soundEngine.playClick();
    setLang(newLang);
  };

  return (
    <div className={`flex items-center space-x-1.5 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-slate-300 shadow-sm ${className}`}>
      <button
        type="button"
        onClick={() => handleSelect('hu')}
        className={`px-3 py-1 rounded-full text-xs font-black transition flex items-center space-x-1 ${
          lang === 'hu' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-200/70'
        }`}
      >
        <span>🇭🇺</span>
        <span>HU</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`px-3 py-1 rounded-full text-xs font-black transition flex items-center space-x-1 ${
          lang === 'en' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-200/70'
        }`}
      >
        <span>🇬🇧</span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('de')}
        className={`px-3 py-1 rounded-full text-xs font-black transition flex items-center space-x-1 ${
          lang === 'de' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-700 hover:bg-slate-200/70'
        }`}
      >
        <span>🇩🇪</span>
        <span>DE</span>
      </button>
    </div>
  );
}
