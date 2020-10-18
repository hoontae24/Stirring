const init: AppInitializer = async ({ app, routePrefix = '' }) => {
  const { router } = app;
  const authController = app.controllers.auth;
  const actionController = app.controllers.action;

  router.post(
    `${routePrefix}`,
    authController.requireLogin,
    actionController.create,
  );

  return { app, router };
};

export default init;
