import dbLoader from './db';
import appLoader from './server';

const init: AppInitializer = async ({ app }) => {
  // Initialize loaders

  await dbLoader({ app });
  await appLoader({ app });

  return { app };
};

export default {
  init
};
