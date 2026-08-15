import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, HelpCircle } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function HowToPlayModal({ onClose }) {
  const { lang, t } = useLanguage();
  const [activeStep, setActiveStep] = useState(1);
  const demoCanvasRef = useRef(null);

  // Animated drawing simulation for Step 2
  useEffect(() => {
    if (activeStep !== 2) return;
    const canvas = demoCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    let progress = 0;
    const animationInterval = setInterval(() => {
      progress += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw sun
      ctx.strokeStyle = '#f59e0b';
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.arc(60, 40, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw house body
      ctx.strokeStyle = '#6366f1';
      ctx.fillStyle = '#e0e7ff';
      ctx.fillRect(100, 80, 100, 80);
      ctx.strokeRect(100, 80, 100, 80);

      // Draw roof
      ctx.strokeStyle = '#ef4444';
      ctx.fillStyle = '#fca5a5';
      ctx.beginPath();
      ctx.moveTo(90, 80);
      ctx.lineTo(150, 30);
      ctx.lineTo(210, 80);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Animated drawing cursor
      const cursorX = 90 + Math.sin(progress * 4) * 60 + progress * 20;
      const cursorY = 80 + Math.cos(progress * 4) * 20;

      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 6, 0, Math.PI * 2);
      ctx.fill();

      if (progress > 5) progress = 0;
    }, 50);

    return () => clearInterval(animationInterval);
  }, [activeStep]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 md:p-8 border-2 border-indigo-200 text-slate-800 bg-white relative shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-700">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">{t('how_to_play')}</h2>
              <p className="text-xs text-slate-500 font-medium">DrawItOut Guide (HU/EN/DE)</p>
            </div>
          </div>

          <button
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => { soundEngine.playClick(); setActiveStep(step); }}
              className={`py-2 px-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center ${
                activeStep === step ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{step}. Step</span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 min-h-[260px] flex flex-col items-center justify-center text-center space-y-4">
          {activeStep === 1 && (
            <div className="space-y-4 animate-fade-in w-full max-w-md">
              <div className="p-3 bg-indigo-100 text-indigo-800 rounded-2xl inline-block font-extrabold text-sm">
                1. {lang === 'de' ? 'Wähle ein Wort' : lang === 'en' ? 'Choose a Word' : 'Válassz egy szót!'}
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {lang === 'de' ? 'Wähle eines von 3 Wörtern aus.' : lang === 'en' ? 'Choose one of 3 words.' : 'Válassz 1-et a 3 felkínált szóból!'}
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-3 bg-emerald-500 text-white rounded-xl font-black text-xs shadow-md">APFEL 🟢</div>
                <div className="p-3 bg-amber-500 text-white rounded-xl font-black text-xs shadow-md">HAUS 🟡</div>
                <div className="p-3 bg-rose-500 text-white rounded-xl font-black text-xs shadow-md">VULKAN 🔴</div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-3 animate-fade-in w-full flex flex-col items-center">
              <div className="p-3 bg-indigo-100 text-indigo-800 rounded-2xl inline-block font-extrabold text-sm">
                2. {lang === 'de' ? 'Zeichne auf der Leinwand' : lang === 'en' ? 'Draw on Canvas' : 'Rajzolj simán & színesen!'}
              </div>
              <canvas
                ref={demoCanvasRef}
                width={300}
                height={160}
                className="bg-white rounded-xl border-2 border-indigo-200 shadow-inner"
              />
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-4 animate-fade-in w-full max-w-md">
              <div className="p-3 bg-indigo-100 text-indigo-800 rounded-2xl inline-block font-extrabold text-sm">
                3. {lang === 'de' ? 'Errate das Wort im Chat' : lang === 'en' ? 'Guess the Word in Chat' : 'Tippelj a chaten!'}
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-300 text-left space-y-2 text-xs">
                <div className="p-2 bg-emerald-100 text-emerald-900 rounded-lg font-bold">🎉 Anna guessed the word! (+450 pt)</div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-4 animate-fade-in w-full max-w-md">
              <div className="p-3 bg-indigo-100 text-indigo-800 rounded-2xl inline-block font-extrabold text-sm">
                4. {lang === 'de' ? 'Gewinne Punkte und steige aufs Podium' : lang === 'en' ? 'Score Points & Win!' : 'Gyűjts pontokat és nyerj!'}
              </div>
              <div className="flex items-center justify-center space-x-3 text-3xl">
                <span>🥇</span>
                <span>🏆</span>
                <span>🎨</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2">
          <button
            onClick={() => { soundEngine.playClick(); setActiveStep((prev) => (prev > 1 ? prev - 1 : 4)); }}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition"
          >
            Back
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              if (activeStep < 4) {
                setActiveStep((prev) => prev + 1);
              } else {
                onClose();
              }
            }}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md transition"
          >
            {activeStep < 4 ? 'Next' : 'OK 🚀'}
          </button>
        </div>
      </div>
    </div>
  );
}
