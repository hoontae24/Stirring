import Router from 'koa-router';

import { statusController } from '@/controllers';

import auth from './auth';
import user from './user';

const init: AppInitializer = async ({ app }) => {
  // Create a router instance
  const router = new Router();

  // Mapping routes
  router.all('/api', statusController.check);
  router.use('/api/auth', auth.routes());
  router.use('/api/user', user.routes());

  // Initialize routes
  app.use(router.routes()).use(router.allowedMethods());
  return { app };
};

export default {
  init,
};
