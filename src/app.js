import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';

import ImageRouter from './routes/images.routes.js';
import ConfigRouter from './routes/config.routes.js';

const app = express();

app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/images', ImageRouter);
app.use('/config', ConfigRouter);

app.use((err, req, res, next) => {
  return res
    .status(err.statusCode || 500)
    .json({ status: 'error', message: err?.error?.message || 'An unexpected error occurred' });
});

export default app;