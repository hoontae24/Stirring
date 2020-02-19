export { default as userController } from './user';
export { default as authController } from './auth';

const check: Koa.Middleware = async ctx => {
  ctx.body = 'OK';
};

export const statusController = {
  check,
};
