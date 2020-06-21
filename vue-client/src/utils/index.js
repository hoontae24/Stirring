import env from '@/consts/env';

export const getApiBaseUrl = () => {
  const protocol =
    (typeof location !== 'undefined' && location.protocol) ||
    (env.DEV ? 'http' : 'https');
  const apiHost = env.API_HOST;
  const apiPort = env.API_PORT;
  const baseUrl = `${protocol}//${apiHost}${env.DEV ? `:${apiPort}` : ``}/api`;

  return baseUrl;
};
