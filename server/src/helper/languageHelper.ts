import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Language } from '../types';

export const getLanguages = () => {
    let languages = [];
    for (const lang in Language) {
        languages.push(lang as Language);
    }
    return languages;
};

export const getLanguageJSON = (project: string, lang: Language) => {
    return readFileSync(
        path.resolve(`../server/data/${project}/lang/${lang}.json`),
        'utf8'
    );
};

export const getLanguagesJSON = (project: string, langs: Language[]) => {
    const languagesData = langs.reduce((languages: any, lang) => {
        const langJSON = readFileSync(
            path.resolve(`../server/data/${project}/lang/${lang}.json`),
            'utf8'
        );

        languages = {
            ...languages,
            [lang]: JSON.parse(langJSON),
        };

        return languages;
    }, []);

    return JSON.stringify(languagesData);
};

export const createLanguagesJSON = (project: string) => {
    for (const lang in Language) {
        writeFileSync(
            path.resolve(`../server/data/${project}/lang/${lang}.json`),
            JSON.stringify({ startHere: 'start here' })
        );
    }
};
