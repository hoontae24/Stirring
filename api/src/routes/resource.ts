const init: AppInitializer = async ({ app, routePrefix = '' }) => {
  const { router } = app;
  const resourceController = app.controllers.resource;

  router.post(`${routePrefix}`, resourceController.create);
  router.get(`${routePrefix}/download/:id`, resourceController.download);
  return { app, router };
};

export default init;
