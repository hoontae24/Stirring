import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
  {
    name: 'not-found',
    path: '/:data(.*)',
    component: NotFound,
  },
];

export default routes;
