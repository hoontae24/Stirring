import Router from 'koa-router';

const init: AppInitializer = async ({ app }) => {
  // Create a router instance
  const router = new Router();

  // Status
  router.all('/status', ctx => {
    ctx.body = 'OK';
  });

  // Initialize routes
  app.use(router.routes()).use(router.allowedMethods());
  return { app };
};

export default {
  init
};
