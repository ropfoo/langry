import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Language, LanguageField } from '../../../types';

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
