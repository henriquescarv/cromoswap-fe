import { ReactNode } from 'react';
import BRLocales from '../../locales/locales.br';

export type LanguageStatus = 'br' | 'en';

export type LocaleContextProps = {
  language: LanguageStatus;
  locale: typeof BRLocales;
};

export type LocaleProviderProps = {
  children: ReactNode;
};

export const LanguageEnum = {
  'pt-BR': 'br',
  'en-US': 'en',
}