'use client';

import React from 'react';
import { useLanguage } from './LanguageProvider';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LanguageToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      aria-label={t('nav.toggleLanguage') || 'Toggle language'}
      className={`fixed top-4 z-[60] bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-lg border border-yellow-500/30 hover:shadow-xl transition-all duration-300 group min-h-[44px] min-w-[44px] md:right-4 right-16 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <div className="w-8 h-6 rounded-md overflow-hidden border border-gray-300 shadow-sm">
          {language === 'en' ? (
            // Saudi Arabia flag
            <div className="w-full h-full bg-gradient-to-b from-green-600 via-white to-green-600 flex items-center justify-center relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div className="text-xs font-bold text-green-600">🇸🇦</div>
            </div>
          ) : (
            // UK flag
            <div className="w-full h-full bg-gradient-to-br from-blue-600 via-red-600 to-blue-600 flex items-center justify-center">
              <div className="text-xs font-bold text-white">🇬🇧</div>
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors hidden sm:block">
          {language === 'en' ? 'العربية' : 'English'}
        </span>
      </div>
    </motion.button>
  );
};

export default LanguageToggle; 