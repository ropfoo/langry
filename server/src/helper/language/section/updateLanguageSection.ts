import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Language, LanguageField } from '../../../types';

export const updateLanguageSection = (
    project: string,
    lang: Language,
    section: { name: string; content: LanguageField }
) => {
    const filePath = path.resolve(
        `../server/data/${project}/lang/${lang}.json`
    );
    const langJSON = readFileSync(filePath, 'utf-8');

    let updatedLang = JSON.parse(langJSON);

    if (updatedLang.hasOwnProperty(section.name)) {
        if (
            updatedLang[section.name].hasOwnProperty(section.content.attribute)
        ) {
            updatedLang[section.name][section.content.attribute] =
                section.content.value;
            return writeFileSync(filePath, JSON.stringify(updatedLang));
        }
    }
};
