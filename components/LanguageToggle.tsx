'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
  { code: 'ha', label: 'Hausa' },
  { code: 'fr', label: 'Français' },
  { code: 'eg', label: 'العربية المصرية' },
];

const LanguageToggle: React.FC<{ className?: string; hideOnMobileMenu?: boolean }> = ({ className = '', hideOnMobileMenu = false }) => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { isRTL } = useLanguage();

  return (
    <div
      className={`sm:fixed sm:top-4 ${isRTL ? 'sm:left-4' : 'sm:right-8'} static relative z-[70] bg-white/95 backdrop-blur-sm rounded-full shadow-lg border border-yellow-500/30 hover:shadow-xl transition-all duration-300 group min-h-[36px] min-w-[36px] ${hideOnMobileMenu ? 'hidden sm:block' : ''} ${className} mx-1 my-1 sm:mx-0 sm:my-0`}
      style={{ zIndex: 80 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        aria-label={t('nav.toggleLanguage') || 'Toggle language'}
        className="flex items-center px-4 py-2 rounded-full focus:outline-none"
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
          {languages.find(l => l.code === language)?.label || 'Language'}
        </span>
        <svg className="ml-2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-[80]`} style={{ [isRTL ? 'left' : 'right']: 0, [isRTL ? 'right' : 'left']: 'auto', marginLeft: isRTL ? '0.5rem' : undefined, marginRight: !isRTL ? '0.5rem' : undefined }}>
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => { setLanguage(l.code); setOpen(false); }}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-yellow-100 ${language === l.code ? 'font-bold text-blue-700' : 'text-gray-700'}`}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageToggle;