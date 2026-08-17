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
    <div className={`flex items-center space-x-1 bg-white p-1 rounded-2xl border border-[#e5e0d5] shadow-2xs ${className}`}>
      <button
        type="button"
        onClick={() => handleSelect('hu')}
        className={`px-2.5 py-1 rounded-xl text-xs font-black transition flex items-center space-x-1 touch-manipulation ${
          lang === 'hu' ? 'bg-[#386641] text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
        }`}
        title="Magyar"
      >
        <span>🇭🇺</span>
        <span className="hidden sm:inline">HU</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('en')}
        className={`px-2.5 py-1 rounded-xl text-xs font-black transition flex items-center space-x-1 touch-manipulation ${
          lang === 'en' ? 'bg-[#386641] text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
        }`}
        title="English"
      >
        <span>🇬🇧</span>
        <span className="hidden sm:inline">EN</span>
      </button>

      <button
        type="button"
        onClick={() => handleSelect('de')}
        className={`px-2.5 py-1 rounded-xl text-xs font-black transition flex items-center space-x-1 touch-manipulation ${
          lang === 'de' ? 'bg-[#386641] text-white shadow-2xs' : 'text-stone-600 hover:bg-stone-100'
        }`}
        title="Deutsch"
      >
        <span>🇩🇪</span>
        <span className="hidden sm:inline">DE</span>
      </button>
    </div>
  );
}
