import { readFileSync } from 'fs';
import { Language } from './types';

export const getLanguageJSON = (lang: Language) => {
  return readFileSync(`${__dirname}/data/lang/${lang}.json`, 'utf8');
};
