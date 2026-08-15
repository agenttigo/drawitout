import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../Common/LanguageSelector';
import { DrawingCanvas } from './DrawingCanvas';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

export function SandboxCanvas({ playerName, avatar, onLeave }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full p-4 bg-slate-100 text-slate-800 flex flex-col space-y-4">
      <div className="glass-panel p-4 rounded-2xl flex items-center justify-between shadow-sm">
        <button
          onClick={() => { soundEngine.playClick(); onLeave(); }}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition border border-slate-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back_to_lobby')}</span>
        </button>

        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-black text-slate-900">
            {t('sandbox_title')}
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <LanguageSelector />
          <span className="text-xs text-slate-500 font-bold">
            {t('sandbox_desc')}
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <DrawingCanvas
          isDrawer={true}
          socket={null}
          roomId="SANDBOX"
          onSendReaction={() => {}}
        />
      </div>
    </div>
  );
}
