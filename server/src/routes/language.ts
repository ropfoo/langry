import express from 'express';
import { createLanguageAttribute } from '../helper/language/attribute/createLanguageAttribute';
import { updateLanguageAttribute } from '../helper/language/attribute/updateLanguageAttribute';
import { createLanguageSection } from '../helper/language/section/createLanguageSection';
import { updateLanguageSection } from '../helper/language/section/updateLanguageSection';
import {
    getLanguageJSON,
    getLanguages,
    getLanguagesJSON,
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

    // Create Language Section
    router.post(`/createSection`, (req, res) => {
        res.json({ requestBody: req.body });
        if (req.body.sectionName && req.body.sectionContent) {
            createLanguageSection(
                project,
                req.body.sectionName,
                req.body.sectionContent
            );
        }
    });

    // Define Language Routes
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

        // Update Language Section
        router.post(`/${lang}/updateSection`, (req, res) => {
            res.json({ requestBody: req.body });
            if (req.body.sectionName && req.body.sectionContent) {
                updateLanguageSection(project, lang as Language, {
                    name: req.body.sectionName,
                    content: req.body.sectionContent,
                });
            }
        });
    }

    return router;
};
