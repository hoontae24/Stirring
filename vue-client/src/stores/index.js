import authService from '@/services/auth';
import { createAuthStore, AUTH_STORE_KEY } from './viewer';
import { UTIL_STORE_KEY, createUtilStore } from './util';

export default async ({ app }) => {
  const { account } = await authService.verify();
  app.provide(AUTH_STORE_KEY, createAuthStore(account));
  app.provide(UTIL_STORE_KEY, createUtilStore());
};
