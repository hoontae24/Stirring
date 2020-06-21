/**
 * had been injected by dovenv-webpack
 * Configure variables
 */
const env = {
  /** 현재 실행 환경이 개발모드인지 */
  DEV: process.env.NODE_ENV === 'development',
  /** 현재 실행 환경 */
  NODE_ENV: process.env.NODE_ENV || 'development',
  /** API 서버의 호스트 */
  API_HOST: process.env.API_HOST || 'localhost',
  /** API 서버의 포트, Production 버전에서는 80 or 443으로 해야하지 않을까. */
  API_PORT: Number(process.env.API_PORT) || 4000,
  /** HTTP(S) Header 및 LocalStorage 키, API 서버의 설정과 일치해야함 */
  ACCESS_TOKEN_KEY:
    process.env.ACCESS_TOKEN_KEY || 'stirring-access-token',
};
env.DEV && console.log(env);

export default env;
