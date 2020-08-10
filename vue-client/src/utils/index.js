import env from '@/consts/env';

export const getApiBaseUrl = () => {
  const protocol =
    (typeof location !== 'undefined' && location.protocol) ||
    (env.DEV ? 'http:' : 'https:');
  const port = typeof location !== 'undefined' && location.port;

  const apiHost = env.API_HOST;
  const apiPort = env.API_PORT;
  const baseUrl = `${protocol}//${apiHost}${
    (port ? `:${apiPort}` : '') ||
      // (env.DEV ?
      `:${apiPort}`
    // : ``  )
  }/api`;

  return baseUrl;
};

export const getImageDataFromFile = (file) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = (e) => res(e.target.result);
    reader.readAsDataURL(file);
  });
};
