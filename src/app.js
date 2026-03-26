import express from 'express';

import ImageRouter from './routes/images.routes.js';
import ConfigRouter from './routes/config.routes.js';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/images', ImageRouter);
app.use('/config', ConfigRouter);

app.use((error, req, res, next) => {
  return res
    .status(error.statusCode || 500)
    .json({ status: 'error', message: error.message || 'An unexpected error occurred' });
});

export default app;
