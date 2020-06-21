import { reactive, inject, computed } from 'vue';

import tokenStore from './token';

export const AUTH_STORE_KEY = Symbol('AUTH_STORE');

export const useAuthStore = () => inject(AUTH_STORE_KEY);

export const createAuthStore = (account) => {
  const state = reactive({
    account: account || null,
  });

  const getViewer = () => computed(() => state.account);
  const setViewer = (account) => {
    state.account = account || null;
  };
  const login = (account) => {
    setViewer(account);
  };
  const logout = () => {
    setViewer(null);
    tokenStore.setToken(null);
  };

  return {
    getViewer,
    setViewer,
    login,
    logout,
  };
};

