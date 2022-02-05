import { useEffect, useState } from 'react';
import { Method, useFetch } from './useFetch';

export type Section = {
    title: string;
    fields: any[];
};

export function useProject(projectName: string) {
    const [projectLang, setProjectLang] = useState('');

    // ugly state
    const [languageSections, setLanguageSections] = useState<Section[]>([]);

    // TODO make work with sections and stuff
    const getLangSections = (object: any) => {
        const languages = Object.entries(object);
        const sections = languages.reduce((value: Section[], lang: any) => {
            const fields = Object.entries(lang[1]).reduce(
                (fieldVal: any, field) => {
                    if (typeof field[1] === 'string') {
                        fieldVal = [...fieldVal, field];
                    }
                    return fieldVal;
                },
                []
            );

            value.push({
                title: lang[0],
                fields: fields,
            });
            return value;
        }, []);

        setLanguageSections(sections);
    };

    const projectData = useFetch(
        `${process.env.REACT_APP_LANGRY_API}/projects/${projectName}/lang`,
        Method.GET
    );

    useEffect(() => {
        if (projectData.data) {
            setProjectLang(projectData.data);
            getLangSections(projectData.data);
        }
    }, [projectData.data]);

    return { projectLang, languageSections, refetch: projectData.refetch };
}
