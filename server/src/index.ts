import express from 'express';

import { getLanguageJSON } from './getLanguage';
import { Language } from './types';

const app = express();
const port = 5000;

app.get('/', (_, res) => {
  res.send('hello');
});

app.get('/lang/en', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(getLanguageJSON(Language.EN));
});

app.get('/lang/de', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.end(getLanguageJSON(Language.DE));
});

app.listen(port, () => console.log(`Running on port ${port}`));
