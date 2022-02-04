import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Language, LanguageField } from '../types';

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

export const updateLanguageAttribute = (
    project: string,
    lang: Language,
    { attribute, value }: LanguageField
) => {
    const filePath = path.resolve(
        `../server/data/${project}/lang/${lang}.json`
    );
    const langJSON = readFileSync(filePath, 'utf-8');

    let updatedLang = JSON.parse(langJSON);

    if (updatedLang.hasOwnProperty(attribute)) {
        updatedLang[attribute] = value;
        return writeFileSync(filePath, JSON.stringify(updatedLang));
    }
};

export const createLanguageAttribute = (
    project: string,
    attribute: string,
    langValues: { lang: Language; value: string }[] | undefined
) => {
    const langFiles = readdirSync(
        path.resolve(`../server/data/${project}/lang`)
    );

    for (const langFile of langFiles) {
        const filePath = path.resolve(
            `../server/data/${project}/lang/${langFile}`
        );

        const langJSON = readFileSync(filePath, 'utf-8');
        const langName = langFile.split('.')[0];
        const definedAttribute = langValues?.find(
            langValue => langValue.lang === langName
        );

        let updatedLang = JSON.parse(langJSON);
        if (!updatedLang.hasOwnProperty(attribute)) {
            updatedLang[attribute] = definedAttribute?.value ?? '';
            writeFileSync(filePath, JSON.stringify(updatedLang));
        }
    }
};
