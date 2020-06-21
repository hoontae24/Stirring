import { useAuthStore } from '@/stores/viewer';

const navs = [
  {
    label: 'Home',
    name: 'home',
    path: '/',
  },
  {
    label: 'LOGIN',
    name: 'login',
    path: '/login',
    requiredLogin: false,
    requiredLogout: true,
    isSub: true,
  },
  {
    label: 'LOGOUT',
    handler: (authStore) => authStore.logout(),
    requiredLogin: true,
    requiredLogout: false,
    isSub: true,
  },
].map((nav) => ({ ...nav, label: nav.label.toUpperCase() }));

export default navs;
