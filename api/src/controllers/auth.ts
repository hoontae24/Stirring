import { authService } from 'services';
import { config } from 'consts';

const inspectAuth: Koa.Middleware = async (ctx, next) => {
  const token = ctx.get(config.X_ACCESS_TOKEN);
  const { user } = await authService.verifyToken(token);
  if (user) {
    ctx.user = user;
  }

  await next();
};

const login: Koa.Middleware = async ctx => {
  const { request } = ctx;
  const { email, password } = request.body;

  const { user, token } = await authService.login(email, password);

  ctx.set(config.X_ACCESS_TOKEN, token);
  ctx.body = { user, token };
};

const verify: Koa.Middleware = async ctx => {
  const token = ctx.get(config.X_ACCESS_TOKEN);
  const { user, decoded } = await authService.verifyToken(token);
  if (!user) {
    ctx.status = 401;
    ctx.body = 'No authorization';
    return;
  }

  ctx.body = { user, decoded };
};

export default {
  inspectAuth,
  login,
  verify,
};
