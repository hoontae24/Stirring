import * as models from '@/models';

const init: AppInitializer = async ({ app }) => {
  app.models = models;
  return { app };
};

export default init;
