import { join } from 'path';
import express from 'express';
import raven from 'raven';
import dotenv from 'dotenv';
import Vantage from 'vantage';

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

app.use(raven.errorHandler(SENTRY_DSN_PRIVATE));

vantage.listen(app, PORT);
console.log(`*** started *** PORT:${PORT} ***`);