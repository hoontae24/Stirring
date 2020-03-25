const navs = [
  {
    name: 'home',
    path: '/',
    label: 'HOME',
  },
  {
    name: 'login',
    path: '/login',
    label: 'LOGIN',
    requiredLogin: false,
    requiredLogout: true,
    isSub: true,
  },
];

export default navs;
