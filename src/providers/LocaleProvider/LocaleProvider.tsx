import React, { createContext, useEffect, useState } from 'react';
import { LanguageEnum, LanguageStatus, LocaleContextProps, LocaleProviderProps } from './LocaleProvider.types';
import * as Localization from 'expo-localization';
import BRLocales from '@/locales/locales.br';
import ENLocales from '@/locales/locales.en';

const LocaleContextDefault = {
  language: 'en' as LanguageStatus,
  locale: BRLocales,
  setLanguage: (language: LanguageStatus) => language,
};

const content = {
  br: BRLocales,
  en: ENLocales,
};

export const LocaleContext = createContext<LocaleContextProps>(LocaleContextDefault);

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [language, setLanguage] = useState<keyof typeof content>('br');

  useEffect(() => {
    const deviceLanguage = Localization.getLocales()[0].languageTag;

    const appLanguage = Object.keys(LanguageEnum).includes(deviceLanguage)
      ? LanguageEnum[deviceLanguage as keyof typeof LanguageEnum]
      : 'br';

    setLanguage(appLanguage as keyof typeof content);
  }, []);

  const contextValue = {
    language: language,
    locale: content[language],
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      {children}
    </LocaleContext.Provider>
  );
};