import express from 'express';
import { createProject, getProjects } from '../helper/projectHelper';
import { languageRouter } from './language';

export const projectRouter = () => {
    const router = express.Router();

    router.get('/', (_, res) => {
        res.setHeader('Content-Type', 'application/json');
        const projects = getProjects();
        res.send(projects);
    });

    // Create new project
    router.post('/create', (req, res) => {
        res.json({ requestBody: req.body });
        createProject(req.body.name);
        createProjectRoutes();
    });

    // Route for each project
    const createProjectRoutes = () => {
        const projects = getProjects();
        for (const project of projects) {
            router.get(`/${project}`, (_, res) => {
                res.send(project);
            });
            router.use(`/${project}/lang`, languageRouter(project));
        }
    };

    createProjectRoutes();

    return router;
};
