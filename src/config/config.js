const config = {
  provider: process.env.DEFAULT_IMAGE_PROVIDER || 'togetherai',
  model: process.env.DEFAULT_IMAGE_MODEL || 'togetherai:black-forest-labs/flux.1-dev'
};

export default config;
