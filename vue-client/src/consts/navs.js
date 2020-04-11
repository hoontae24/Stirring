const navs = [
  {
    name: 'home',
    path: '/',
    label: 'Home',
  },
  {
    name: 'login',
    path: '/login',
    label: 'LOGIN',
    requiredLogin: false,
    requiredLogout: true,
    isSub: true,
  },
].map(nav => ({ ...nav, label: nav.label.toUpperCase() }));

export default navs;
