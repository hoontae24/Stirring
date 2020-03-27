import VueRouter from 'vue-router';

import routes from './routes';
import { env } from '@/consts';

const pushRoute = function(location, onComplete, onAbort) {
  if (env.DEV) {
    console.log('Router push:', location);
  }

  return this.push(location, onComplete, onAbort);
};

export default ({ Vue, vueOptions }) => {
  Vue.use(VueRouter);
  VueRouter.prototype.pushRoute = pushRoute;

  const router = new VueRouter({
    mode: 'history',
    routes,
  });

  vueOptions.router = router;
};
