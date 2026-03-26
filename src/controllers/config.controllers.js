import config from '../config/config.js';
import Puter from '../PuterClient.js';
import models from '../config/models.json' with { type: 'json' };

const imageModelProviders = models.providers.map(p => p.name);
const imageModels = models.providers.flatMap(p => p.models.map(m => m.id));

const getConfig = (req, res, next) => {
  res.status(200).json({ model: config.model, provider: config.provider });
};

const setConfig = (req, res, next) => {
  const { model, provider } = req.body;
  
  if (!model || !provider) {
    return res.status(400).json({ error: 'model and provider are required' });
  }

  config.model = model;
  config.provider = provider;
  res.status(201).json({ message: 'Configuration updated', model, provider });
};

const getModelProviders = async (req, res, next) => {
  const modelProviders = await Puter.ai.listModelProviders();
  return res.status(200).json(modelProviders);
};

const getModels = async (req, res, next) => {
  const provider = req.query.provider || null;
  const modelsList = await Puter.ai.listModels(provider);
  return res.status(200).json(modelsList);
};

const getImageModelProviders = async (req, res, next) => {
  return res.status(200).json(imageModelProviders);
};

const getImageModels = (req, res, next) => {
  const selectedProvider = req.query.provider;
  if (!selectedProvider) {
    const error = new Error('Provider not specified');
    error.statusCode = 400;
    next(error);
  }
  for (const provider of models.providers) {
    if (provider.name === selectedProvider) {
        return res.status(200).json(provider.models);
    }
  }

  const error = new Error(`Provider: ${selectedProvider} not found!`);
  error.statusCode = 404;
  next(error);
};

export {
  getConfig,
  setConfig,
  getModels,
  getModelProviders,
  getImageModelProviders,
  getImageModels
};
