import { authService } from 'services';

const inspectAuth: Koa.Middleware = async (ctx, next) => {
  const token = ctx.get('x-access-token');
  const user = await authService.verifyToken(token);
  if (user) {
    ctx.user = user;
  }

  await next();
};

const login: Koa.Middleware = async ctx => {
  const { request } = ctx;
  const { email, password } = request.body;

  const { user, token } = await authService.login(email, password);

  ctx.set('x-access-token', token);
  ctx.body = { user, token };
};

const verify: Koa.Middleware = async ctx => {
  const token = ctx.get('x-access-token');
  const user = await authService.verifyToken(token);
  if (!user) {
    ctx.status = 401;
    ctx.body = 'No authorization';
    return;
  }

  ctx.body = 'OK';
};

export default {
  inspectAuth,
  login,
  verify,
};
