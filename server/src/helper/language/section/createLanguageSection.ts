import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { Language } from '../../../types';

export const createLanguageSection = (
    project: string,
    sectionName: string,
    langValues: { lang: Language; attribute: string; value: string }[]
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

        const definedContent = langValues?.find(
            langValue => langValue.lang === langName
        );

        // set section content
        let sectionContent = {};
        if (langValues.length) {
            sectionContent = langValues.reduce((value: any, content) => {
                value = {
                    ...value,
                    [content.attribute]: definedContent ? content.value : '',
                };

                return value;
            }, []);
        }

        let updatedLang = JSON.parse(langJSON);
        if (!updatedLang.hasOwnProperty(sectionName)) {
            updatedLang[sectionName] = sectionContent;
            writeFileSync(filePath, JSON.stringify(updatedLang));
        }
    }
};
