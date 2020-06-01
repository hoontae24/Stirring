const init: AppInitializer = async ({ app, routePrefix = '' }) => {
  const { router } = app;
  const authController = app.controllers.auth;

  router.post(`${routePrefix}`, authController.register);
  return { app, router };
};

export default init;
