import VueRouter from 'vue-router';

import routes from './routes';

export default ({ Vue, options }) => {
  const router = new VueRouter({
    mode: 'history',
    routes,
  });

  Vue.use(VueRouter);
  options.router = router;
};
