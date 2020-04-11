import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

export default ({ app }) => {
  const routerHistory = createWebHistory();
  const router = createRouter({
    history: routerHistory,
    routes,
  });

  app.use(router);
};
