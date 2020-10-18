const init: AppInitializer = async ({ app, routePrefix = '' }) => {
  const { router } = app;
  const authController = app.controllers.auth;
  const postController = app.controllers.post;

  router.post(
    `${routePrefix}`,
    authController.requireLogin,
    postController.create,
  );
  router.get(`${routePrefix}`, postController.list);
  router.get(`${routePrefix}/:id`, postController.retrieve);
  return { app, router };
};

export default init;
