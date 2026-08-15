import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ContactModal } from '../FooterModals/ContactModal';
import { TermsModal } from '../FooterModals/TermsModal';
import { CreditsModal } from '../FooterModals/CreditsModal';
import { PrivacyModal } from '../FooterModals/PrivacyModal';
import { soundEngine } from '../../utils/soundEngine';

export function Footer() {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState(null); // 'contact', 'terms', 'credits', 'privacy'

  return (
    <footer className="w-full mt-6 pt-4 pb-2 border-t border-slate-200 text-center space-y-3">
      {/* Links Bar */}
      <div className="flex flex-wrap justify-center items-center gap-4 text-xs font-bold text-slate-600">
        <button
          onClick={() => { soundEngine.playClick(); setActiveModal('contact'); }}
          className="hover:text-indigo-600 hover:underline transition"
        >
          {t('footer_contact')}
        </button>

        <span className="text-slate-300">•</span>

        <button
          onClick={() => { soundEngine.playClick(); setActiveModal('terms'); }}
          className="hover:text-indigo-600 hover:underline transition"
        >
          {t('footer_terms')}
        </button>

        <span className="text-slate-300">•</span>

        <button
          onClick={() => { soundEngine.playClick(); setActiveModal('credits'); }}
          className="hover:text-indigo-600 hover:underline transition"
        >
          {t('footer_credits')}
        </button>

        <span className="text-slate-300">•</span>

        <button
          onClick={() => { soundEngine.playClick(); setActiveModal('privacy'); }}
          className="hover:text-indigo-600 hover:underline transition"
        >
          {t('footer_privacy')}
        </button>
      </div>

      {/* Disclaimer Banner Text */}
      <p className="text-[11px] text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
        {t('footer_disclaimer')}
      </p>

      <p className="text-[10px] text-slate-400 font-bold">
        {t('copyright')}
      </p>

      {/* Footer Modals */}
      {activeModal === 'contact' && <ContactModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'terms' && <TermsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'credits' && <CreditsModal onClose={() => setActiveModal(null)} />}
      {activeModal === 'privacy' && <PrivacyModal onClose={() => setActiveModal(null)} />}
    </footer>
  );
}
