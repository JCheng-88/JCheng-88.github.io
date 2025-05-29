// src/contexts/LanguageContext.tsx
"use client";
import type { ReactNode } from 'react';
import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { translations, type Language, availableLanguages, appName } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string, replacements?: Record<string, string | number>) => string;
  availableLanguages: { code: Language; name: string }[];
  appName: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Attempt to load saved language from localStorage
    const savedLanguage = localStorage.getItem('nutricode-lang') as Language | null;
    if (savedLanguage && availableLanguages.find(l => l.code === savedLanguage)) {
      setLanguageState(savedLanguage);
    }
    // Could also try to detect browser language here as a fallback
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nutricode-lang', lang); // Save language to localStorage
  }, []);

  const translate = useCallback((key: string, replacements?: Record<string, string | number>) => {
    let text = translations[language]?.[key] || translations['en']?.[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        text = text.replace(new RegExp(`{${rKey}}`, 'g'), String(replacements[rKey]));
      });
    }
    return text;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate, availableLanguages, appName }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
