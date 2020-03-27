/**
 * had been injected by dovenv-webpack
 * Configure variables
 */
const env = {
  DEV: process.env.NODE_ENV !== 'production',
  NODE_ENV: process.env.NODE_ENV || 'development',
  API_HOST: process.env.API_HOST || 'localhost',
  API_PORT: Number(process.env.API_PORT) || 4000,
};
console.log(env);

export default env;
