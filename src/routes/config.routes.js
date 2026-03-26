import express from 'express';
import * as ConfigController from '../controllers/config.controllers.js';

const router = express.Router();

// GET current config
router.get('/model', ConfigController.getConfig);

// POST update config
router.post('/model', ConfigController.setConfig);

// GET available model providers
router.get('/providers', ConfigController.getModelProviders);

// GET available models
router.get('/models', ConfigController.getModels);

// GET available image generation model providers
router.get('/image-model-providers', ConfigController.getImageModelProviders);

// GET available image generation models of specified provider
router.get('/image-models', ConfigController.getImageModels)

export default router;
