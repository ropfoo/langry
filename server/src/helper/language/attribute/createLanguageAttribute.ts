import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Language } from '../../../types';

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
