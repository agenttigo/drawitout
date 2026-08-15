import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, Heart, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function AboutModal({ onClose }) {
  const { lang, t } = useLanguage();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-pink-100 text-pink-600">
              <Heart className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{t('about_us')}</h2>
              <p className="text-xs text-slate-500 font-medium">DrawItOut - Modern Multiplayer Drawing Game</p>
            </div>
          </div>

          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Highlights */}
        <div className="space-y-4 text-xs text-slate-600 font-medium leading-relaxed">
          <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-start space-x-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-indigo-900 text-sm mb-0.5">
                {lang === 'de' ? '100% Familienfreundlich' : lang === 'en' ? '100% Family Friendly' : '100% Család- és Gyerekbarát'}
              </h4>
              <p>
                {lang === 'de'
                  ? 'Kreatives und sicheres Online-Zeichenspiel für alle Altersgruppen.'
                  : lang === 'en'
                  ? 'Safe, fun and creative multiplayer drawing game for all ages.'
                  : 'A DrawItOut egy biztonságos, vidám és kreatív játék minden korosztály számára.'}
              </p>
            </div>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start space-x-3">
            <Zap className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-purple-900 text-sm mb-0.5">
                {lang === 'de' ? 'Echtzeit WebSockets' : lang === 'en' ? 'Real-time Experience' : 'Valós Idejű Élmény'}
              </h4>
              <p>
                {lang === 'de'
                  ? 'Flüssiges Zeichnen und Raten in Echtzeit ohne Verzögerung.'
                  : lang === 'en'
                  ? 'Real-time drawing strokes and instant guessing with WebSockets.'
                  : 'A legújabb WebSockets technológiával a rajzok és tippelések azonnal megjelennek.'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 text-center">
          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition"
          >
            OK 🚀
          </button>
        </div>
      </div>
    </div>
  );
}
