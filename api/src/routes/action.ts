const init: AppInitializer = async ({ app, routePrefix = '' }) => {
  const { router } = app;
  const authController = app.controllers.auth;
  const actionController = app.controllers.action;

  router.post(
    `${routePrefix}`,
    authController.requireLogin,
    actionController.create,
  );

  router.get(`${routePrefix}`, actionController.list);
  router.delete(`${routePrefix}/:id`, actionController.remove);

  return { app, router };
};

export default init;
