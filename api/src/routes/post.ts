const init: AppInitializer = async ({ app, routePrefix = '' }) => {
  const { router } = app;
  const authController = app.controllers.auth;
  const postController = app.controllers.post;

  router.post(
    `${routePrefix}`,
    authController.requireLogin,
    postController.create,
  );
  return { app, router };
};

export default init;
