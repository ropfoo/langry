import { mkdirSync, readdirSync } from 'fs';
import path from 'path';
import { createLanguagesJSON } from './languageHelper';

export const getProjects = () => readdirSync(path.resolve('../server/data'));

export const createProject = (name: string) => {
    mkdirSync(path.resolve(`../server/data/${name}`));
    mkdirSync(path.resolve(`../server/data/${name}/lang`));
    createLanguagesJSON(name);
};
