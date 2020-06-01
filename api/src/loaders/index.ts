import db from './db';
import middlewares from './middlewares';
import error from './error';
import model from './models';
import service from './services';
import controller from './controllers';
import router from './router';

const init: AppInitializer = async ({ app }) => {
  // Initialize loaders
  await db({ app });
  await model({ app });
  await service({ app });
  await controller({ app });

  // Initialize middlewares
  await middlewares({ app });
  await error({ app });
  await router({ app });

  return { app };
};

export default {
  init,
};
