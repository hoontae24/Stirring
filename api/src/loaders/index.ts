import dbLoader from './db';
import appLoader from './app';
import errorLoader from './error';

const init: AppInitializer = async ({ app }) => {
  // Initialize loaders

  await dbLoader({ app });
  await appLoader({ app });
  await errorLoader({ app });

  return { app };
};

export default {
  init
};
