import Router from 'koa-router';

import { authController } from '@/controllers';

import auth from './auth';
import user from './user';

const init: AppInitializer = async ({ app }) => {
  // Create a router instance
  const router = new Router();

  // // Custom middlewares
  // router.use(authController.inspectAuth);

  // // Mapping routes
  // router.all('/api', async ctx => (ctx.body = 'API OK'));
  // router.use('/api/auth', auth.routes());
  // router.use('/api/user', user.routes());

  // Initialize routes
  app.use(router.routes()).use(router.allowedMethods());
  return { app };
};

export default {
  init,
};
