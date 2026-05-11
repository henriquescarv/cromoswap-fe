import { LanguageStatus } from '@/providers/LocaleProvider/LocaleProvider.types';

export const getAlbumName = (name: any, language: LanguageStatus): string => {
  if (!name || typeof name === 'string') return name || '';
  const key = language === 'br' ? 'pt' : language;
  return name[key] || name.pt || name.en || '';
};
