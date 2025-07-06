'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../lib/i18n';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  const setLanguage = async (lang: string) => {
    setLanguageState(lang);
    
    // Import and initialize i18n dynamically
    const i18n = (await import('../lib/i18n')).default;
    await i18n.changeLanguage(lang);
    
    // Update document direction
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
    
    // Store in localStorage
    localStorage.setItem('language', lang);
  };

  useEffect(() => {
    const initializeLanguage = async () => {
      // Load saved language preference
      const savedLanguage = localStorage.getItem('language') || 'en';
      await setLanguage(savedLanguage);
      setIsInitialized(true);
    };
    
    initializeLanguage();
  }, []);

  const isRTL = language === 'ar';

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}; 