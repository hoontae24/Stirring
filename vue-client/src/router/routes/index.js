import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import NotFound from '@/pages/NotFound';
import PostDetail from '@/pages/Post';

const routes = [
  { name: 'home', path: '/', component: Home },
  { name: 'login', path: '/login', component: Login },
  { path: '/signup', redirect: '/signup/1' },
  {
    name: 'signup',
    path: '/signup/:step',
    component: Signup,
    props: true,
  },
  { name: 'not-found', path: '/:data(.*)', component: NotFound },
  {
    name: 'post-detail',
    path: '/post/:id',
    component: PostDetail,
    props: true,
  },
];

export default routes;
