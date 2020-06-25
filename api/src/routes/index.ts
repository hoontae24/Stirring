import auth from './auth';
import user from './user';
import resource from './resource';

const init: AppInitializer = async ({ app }) => {
  const { router } = app;

  router.use(app.controllers.auth.inspectAuth);

  router.all('/api', async (ctx) => (ctx.body = 'API OK'));

  await auth({ app, routePrefix: '/api/auth' });
  await user({ app, routePrefix: '/api/user' });
  await resource({ app, routePrefix: '/api/resource' });

  app.use(router.routes()).use(router.allowedMethods());
  return { app };
};

export default {
  init,
};
