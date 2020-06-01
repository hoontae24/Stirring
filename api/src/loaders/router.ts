import Router from 'koa-router';

const init: AppInitializer = async ({ app }) => {
  const router = new Router();

  app.router = router;

  return { app };
};

export default init;
