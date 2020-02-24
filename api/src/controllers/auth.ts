import { authService } from 'services';
import { config } from 'consts';

const inspectAuth: Koa.Middleware = async (ctx, next) => {
  const token = ctx.cookies.get(config.ACCESS_TOKEN_NAME);
  if (token) {
    const { user } = await authService.verifyToken(token);
    if (user) {
      ctx.user = user;
    }
  }

  await next();
};

const login: Koa.Middleware = async ctx => {
  const { request } = ctx;
  const { email, password } = request.body;

  const { user, token } = await authService.login(email, password);

  ctx.cookies.set(config.ACCESS_TOKEN_NAME, token, {
    httpOnly: true,
    maxAge: config.TOKEN_MAX_AGE,
  });
  ctx.body = { user, token };
};

const verify: Koa.Middleware = async ctx => {
  const token = ctx.cookies.get(config.ACCESS_TOKEN_NAME);
  if (token) {
    const { user, decoded } = await authService.verifyToken(token);
    if (user) {
      ctx.body = { user, decoded };
      return;
    }
  }

  ctx.status = 401;
  ctx.body = 'No authorization';
};

export default {
  inspectAuth,
  login,
  verify,
};
