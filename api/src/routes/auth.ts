const init: AppInitializer = async ({ app, routePrefix = '' }) => {
  const { router, controllers } = app;
  const authController = controllers.auth;

  router.post(`${routePrefix}/login`, authController.login);
  router.get(`${routePrefix}/verify`, authController.verify);

  return { app, router };
};

export default init;
