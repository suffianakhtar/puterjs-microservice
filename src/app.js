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

app.use("/images", ImageRouter);
app.use("/config", ConfigRouter);

export default app;
