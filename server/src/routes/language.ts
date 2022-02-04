import express from 'express';
import {
    createLanguageAttribute,
    getLanguageJSON,
    getLanguages,
    getLanguagesJSON,
    updateLanguageAttribute,
} from '../helper/languageHelper';
import { Language } from '../types';

export const languageRouter = (project: string) => {
    const router = express.Router();

    router.get('/', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        const languages = getLanguages();
        res.end(getLanguagesJSON(project, languages));
    });

    // Create Language Attribute
    router.post(`/createAttribute`, (req, res) => {
        res.json({ requestBody: req.body });
        if (req.body.attribute) {
            createLanguageAttribute(
                project,
                req.body.attribute,
                req.body.langValues
            );
        }
    });

    for (const lang in Language) {
        router.get(`/${lang}`, (_, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(getLanguageJSON(project, lang as Language));
        });

        // Update Language Attribute
        router.post(`/${lang}/updateAttribute`, (req, res) => {
            res.json({ requestBody: req.body });
            if (req.body.attribute && req.body.value) {
                updateLanguageAttribute(project, lang as Language, {
                    attribute: req.body.attribute,
                    value: req.body.value,
                });
            }
        });
    }

    return router;
};
