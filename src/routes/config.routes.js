// src/routes/config.routes.js
import express from 'express';
import * as ConfigController from '../controllers/config.controllers.js';

const router = express.Router();

router.get('/model', ConfigController.getConfig);
router.post('/model', ConfigController.setConfig);

export default router;
