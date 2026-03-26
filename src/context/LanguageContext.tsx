'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dictionaries, type Lang, type Dictionary } from '@/lib/i18n';

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  toggle: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  t: dictionaries.es,
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-lang');
    if (saved === 'en') setLang('en');
  }, []);

  const toggle = () => {
    setLang((prev) => {
      const next: Lang = prev === 'es' ? 'en' : 'es';
      localStorage.setItem('portfolio-lang', next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, t: dictionaries[lang], toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
