import express from 'express';
import cors from 'cors';
import { projectRouter } from './routes/project';

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (_, res) => {
    res.send('🌍 Welcome to Langry');
});

app.use('/projects', projectRouter());

app.listen(port, () => console.log(`🌍 Langry is running on port ${port} 😾`));
