import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { X, HelpCircle, Palette, Sparkles, Film, Layers, CheckCircle } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function HowToPlayModal({ onClose }) {
  const { t } = useLanguage();
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
      ctx.strokeStyle = '#386641';
      ctx.fillStyle = '#eaf2eb';
      ctx.fillRect(100, 80, 100, 80);
      ctx.strokeRect(100, 80, 100, 80);

      // Draw roof
      ctx.strokeStyle = '#c86d3b';
      ctx.fillStyle = '#fbe9dc';
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

      ctx.fillStyle = '#386641';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 6, 0, Math.PI * 2);
      ctx.fill();

      if (progress > 5) progress = 0;
    }, 50);

    return () => clearInterval(animationInterval);
  }, [activeStep]);

  const STEPS = [
    { id: 1, label: t('htp_step1_btn') },
    { id: 2, label: t('htp_step2_btn') },
    { id: 3, label: t('htp_step3_btn') },
    { id: 4, label: t('htp_step4_btn') },
    { id: 5, label: t('htp_step5_btn') },
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-2xl glass-panel rounded-3xl p-5 sm:p-7 border-2 border-[#e5e0d5] dark:border-[#333e4d] text-[#1e242b] dark:text-[#f1f5f9] bg-white dark:bg-[#1c232d] relative shadow-2xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-2xl bg-[#eaf2eb] dark:bg-[#1f3323] text-[#386641] dark:text-[#52a061] shadow-2xs">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#1e242b] dark:text-white">{t('how_to_play')}</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-bold">{t('htp_subtitle')}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => { soundEngine.playClick(); onClose(); }}
            className="p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition touch-manipulation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {STEPS.map((step) => (
            <button
              key={step.id}
              type="button"
              onClick={() => { soundEngine.playClick(); setActiveStep(step.id); }}
              className={`py-2 px-1.5 sm:px-3 rounded-2xl text-[11px] sm:text-xs font-black transition flex items-center justify-center touch-manipulation ${
                activeStep === step.id
                  ? 'bg-[#386641] text-white shadow-md'
                  : 'bg-stone-100 dark:bg-[#161b22] text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-[#252f3d] border border-stone-200 dark:border-[#333e4d]'
              }`}
            >
              <span>{step.label}</span>
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-[#faf8f3] dark:bg-[#161b22] rounded-3xl p-5 sm:p-6 border border-[#e5e0d5] dark:border-[#333e4d] min-h-[270px] flex flex-col items-center justify-center text-center space-y-3">
          {activeStep === 1 && (
            <div className="space-y-3 animate-fade-in w-full max-w-md">
              <div className="p-2.5 px-4 bg-[#eaf2eb] dark:bg-[#1f3323] text-[#2c5234] dark:text-[#52a061] rounded-2xl inline-block font-black text-xs sm:text-sm shadow-2xs">
                {t('htp_step1_title')}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-semibold">
                {t('htp_step1_desc')}
              </p>
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-3 bg-[#386641] text-white rounded-2xl font-black text-xs shadow-xs">ALMA 🟢</div>
                <div className="p-3 bg-[#ca8a04] text-white rounded-2xl font-black text-xs shadow-xs">HÁZ 🟡</div>
                <div className="p-3 bg-[#c86d3b] text-white rounded-2xl font-black text-xs shadow-xs">VULKÁN 🔴</div>
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-3 animate-fade-in w-full flex flex-col items-center">
              <div className="p-2.5 px-4 bg-[#eaf2eb] text-[#2c5234] rounded-2xl inline-block font-black text-xs sm:text-sm shadow-2xs">
                {t('htp_step2_title')}
              </div>
              <p className="text-xs text-stone-600 font-semibold max-w-md">
                {t('htp_step2_desc')}
              </p>
              <canvas
                ref={demoCanvasRef}
                width={300}
                height={150}
                className="bg-white rounded-2xl border-2 border-[#e5e0d5] shadow-inner mt-1"
              />
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-3 animate-fade-in w-full max-w-md">
              <div className="p-2.5 px-4 bg-[#eaf2eb] text-[#2c5234] rounded-2xl inline-block font-black text-xs sm:text-sm shadow-2xs">
                {t('htp_step3_title')}
              </div>
              <p className="text-xs text-stone-600 font-semibold">
                {t('htp_step3_desc')}
              </p>
              <div className="bg-white p-3 rounded-2xl border border-stone-200 text-left space-y-2 text-xs shadow-xs">
                <div className="p-2 bg-[#eaf2eb] text-[#2c5234] rounded-xl font-bold flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>🎉 Anna kitalálta a szót! (+450 pont)</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="space-y-3 animate-fade-in w-full max-w-md">
              <div className="p-2.5 px-4 bg-[#eaf2eb] text-[#2c5234] rounded-2xl inline-block font-black text-xs sm:text-sm shadow-2xs">
                {t('htp_step4_title')}
              </div>
              <p className="text-xs text-stone-600 font-semibold">
                {t('htp_step4_desc')}
              </p>
              <div className="flex items-center justify-center space-x-4 text-3xl pt-2">
                <span className="p-2 bg-white rounded-2xl border border-stone-200 shadow-2xs">🥇</span>
                <span className="p-2 bg-white rounded-2xl border border-stone-200 shadow-2xs">🏆</span>
                <span className="p-2 bg-white rounded-2xl border border-stone-200 shadow-2xs">🎨</span>
              </div>
            </div>
          )}

          {activeStep === 5 && (
            <div className="space-y-3 animate-fade-in w-full max-w-lg text-left">
              <div className="text-center">
                <div className="p-2.5 px-4 bg-[#eaf2eb] text-[#2c5234] rounded-2xl inline-block font-black text-xs sm:text-sm shadow-2xs">
                  {t('htp_step5_title')}
                </div>
                <p className="text-xs text-stone-600 font-semibold mt-1">
                  {t('htp_step5_desc')}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 bg-white rounded-2xl border border-stone-200 text-xs space-y-1 shadow-2xs">
                  <span className="font-extrabold text-[#1e242b] block">{t('htp_studio_feat_layers')}</span>
                </div>
                <div className="p-2.5 bg-white rounded-2xl border border-stone-200 text-xs space-y-1 shadow-2xs">
                  <span className="font-extrabold text-[#1e242b] block">{t('htp_studio_feat_brushes')}</span>
                </div>
                <div className="p-2.5 bg-white rounded-2xl border border-stone-200 text-xs space-y-1 shadow-2xs">
                  <span className="font-extrabold text-[#1e242b] block">{t('htp_studio_feat_symmetry')}</span>
                </div>
                <div className="p-2.5 bg-white rounded-2xl border border-stone-200 text-xs space-y-1 shadow-2xs">
                  <span className="font-extrabold text-[#1e242b] block">{t('htp_studio_feat_timelapse')}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-2">
          <button
            type="button"
            onClick={() => { soundEngine.playClick(); setActiveStep((prev) => (prev > 1 ? prev - 1 : 5)); }}
            className="px-4 py-2 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition border border-stone-200 touch-manipulation"
          >
            {t('btn_back')}
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playClick();
              if (activeStep < 5) {
                setActiveStep((prev) => prev + 1);
              } else {
                onClose();
              }
            }}
            className="px-6 py-2.5 rounded-2xl bg-[#386641] hover:bg-[#2d5234] text-white font-black text-xs shadow-md transition touch-manipulation"
          >
            {activeStep < 5 ? t('btn_next') : t('btn_got_it')}
          </button>
        </div>
      </div>
    </div>
  );
}
