import React, { createContext, useEffect, useState } from 'react';
import { LanguageEnum, LanguageStatus, LocaleContextProps, LocaleProviderProps } from './LocaleProvider.types';
import * as Localization from 'expo-localization';
import BRLocales from '@/locales/locales.br';
import ENLocales from '@/locales/locales.en';
import ESLocales from '@/locales/locales.es';
import ITALocales from '@/locales/locales.ita';
import ALELocales from '@/locales/locales.ale';

const LocaleContextDefault = {
  language: 'en' as LanguageStatus,
  locale: BRLocales,
  setLanguage: (language: LanguageStatus) => language,
};

const content = {
  br: BRLocales,
  en: ENLocales,
  es: ESLocales,
  ita: ITALocales,
  ale: ALELocales,
};

export const LocaleContext = createContext<LocaleContextProps>(LocaleContextDefault);

export const LocaleProvider = ({ children }: LocaleProviderProps) => {

  const [language, setLanguage] = useState<keyof typeof content>('br');

  useEffect(() => {
    const locales = Localization.getLocales();
    const deviceLanguage = locales && locales.length > 0 ? locales[0].languageCode?.toLowerCase() : 'en';

    let appLanguage: keyof typeof content = 'en';

    if (deviceLanguage === 'es') {
      appLanguage = 'es';
    } else if (deviceLanguage === 'pt') {
      appLanguage = 'br';
    } else if (deviceLanguage === 'de') {
      appLanguage = 'ale';
    } else if (deviceLanguage === 'it') {
      appLanguage = 'ita';
    }

    setLanguage(appLanguage);
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