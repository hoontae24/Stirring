import { authService } from 'services';

const login: Koa.Middleware = async ctx => {
  const { request } = ctx;
  const { email, password } = request.body;

  const { user, token } = await authService.login(email, password);

  ctx.set('x-access-token', token);
  ctx.body = { user, token };
};

const inspectAuth: Koa.Middleware = async (ctx, next) => {
  const token = ctx.get('x-access-token');
  const user = await authService.inspectAuthToken(token);
  if (user) {
    ctx.user = user;
    console.log(ctx.user);
  }

  await next();
};

export default {
  login,
  inspectAuth,
};
