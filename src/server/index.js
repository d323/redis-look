import { join } from 'path';
import express from 'express';
import raven from 'raven';
import dotenv from 'dotenv';
import Vantage from 'vantage';
import { lookup, allKeys } from './cache';

dotenv.config();

const { PORT, SENTRY_DSN_PRIVATE } = process.env;

const sentry = raven.config(SENTRY_DSN_PRIVATE).install();

const vantage = new Vantage();
const app = express();
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(raven.requestHandler(SENTRY_DSN_PRIVATE));
app.use(express.static('ui'));

app.get('/', raven.wrap((req, res) => {
  res.render('index');
}));

app.get('/lookup/:key', raven.wrap((req, res) => {
  const { key: lookupKey } = req.params;

  return lookup(lookupKey)
    .then(results => {
      try {
        const parsed = JSON.parse(results);
        res.json({ data: parsed });
      }
      catch (e) {
        res.json({ data: results });
      }
    })
    .catch(err => {
      res.status(500).json({ errors: [err.message] });
    });
}));

app.get('/allkeys', raven.wrap((req, res) => {
  return allKeys()
    .then(results => {
      res.json({ data: results });
    })
    .catch(err => {
      res.status(500).json({ errors: [err.message] });
    });
}));

app.use(raven.errorHandler(SENTRY_DSN_PRIVATE));

vantage.listen(app, PORT);
console.log(`*** started *** PORT:${PORT} ***`);