import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'login', path: '/login', component: Login },
  { path: '/signup', redirect: '/signup/1' },
  {
    name: 'signup',
    path: '/signup/:step',
    props: true,
    component: Signup,
  },
  { name: 'not-found', path: '/:data(.*)', component: NotFound },
];

export default routes;
