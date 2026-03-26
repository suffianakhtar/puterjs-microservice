import express from 'express';

import * as ImagesController from '../controllers/images.controllers.js';

const router = express.Router();

// POST /generate
router.post('/generate', ImagesController.generateImage);

export default router;