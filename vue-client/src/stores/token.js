import env from '@/consts/env';

const tokenKey = env.ACCESS_TOKEN_KEY || 'stirring-access-token';

const initializeStore = () => {
  const initialToken =
    typeof localStorage !== 'undefined' &&
    localStorage.getItem(tokenKey);
  return {
    _token: initialToken || null,
    getToken() {
      return this._token;
    },
    setToken(t) {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(tokenKey, t || '');
      }
      this._token = t;
    },
  };
};

export default initializeStore();
