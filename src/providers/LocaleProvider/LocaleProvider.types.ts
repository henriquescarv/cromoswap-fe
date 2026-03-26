import { ReactNode } from 'react';
import BRLocales from '../../locales/locales.br';

export type LanguageStatus = 'br' | 'en' | 'es' | 'ita' | 'ale';

export type LocaleContextProps = {
  language: LanguageStatus;
  locale: typeof BRLocales;
};

export type LocaleProviderProps = {
  children: ReactNode;
};

export const LanguageEnum = {
  'pt-BR': 'br',
  'pt-PT': 'br',
  'en-US': 'en',
  'en-GB': 'en',
  'es-ES': 'es',
  'es-MX': 'es',
  'es-AR': 'es',
  'de-DE': 'ale',
  'it-IT': 'ita',
};