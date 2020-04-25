import { models } from '@/db';

const init: AppInitializer = async ({ app }) => {
  app.models = models;
  return { app };
};

export default init;
