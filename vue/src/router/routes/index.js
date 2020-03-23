import Home from '@/views/Home';
import NotFound from '@/views/NotFound';

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home,
  },
  {
    name: 'not-found',
    path: '*',
    component: NotFound,
  },
];

export default routes;
