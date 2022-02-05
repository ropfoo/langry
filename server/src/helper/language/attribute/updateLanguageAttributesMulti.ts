import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Language } from '../../../types';

export const updateLanguageAttributesMulti = (
    project: string,
    lang: Language,
    languageFields: any
) => {
    const filePath = path.resolve(
        `../server/data/${project}/lang/${lang}.json`
    );
    const langJSON = readFileSync(filePath, 'utf-8');

    let updatedLang = JSON.parse(langJSON);

    for (const attribute in languageFields) {
        if (updatedLang.hasOwnProperty(attribute)) {
            updatedLang[attribute] = languageFields[attribute];
        }
    }

    return writeFileSync(filePath, JSON.stringify(updatedLang));
};
