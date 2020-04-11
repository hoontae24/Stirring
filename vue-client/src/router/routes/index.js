import Home from '@/views/Home';
import Login from '@/views/Login';
import NotFound from '@/views/NotFound';

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
    path: '/*',
    component: NotFound,
  },
];

export default routes;
