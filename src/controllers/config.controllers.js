import config from '../config.js';

// GET current config
export const getConfig = (req, res) => {
  res.json({ model: config.model, provider: config.provider });
};

// POST to supdate config
export const setConfig = (req, res) => {
  const { model, provider } = req.body;
  
  if (!model || !provider) {
    return res.status(400).json({ error: 'model and provider are required' });
  }

  config.model = model;
  config.provider = provider;
  res.json({ message: 'Configuration updated', model, provider });
};
