import { Middleware } from 'koa';

import { authService } from 'services';

const login: Middleware = async ctx => {
  const { request } = ctx;
  const { email, password } = request.body;

  const { user, token } = await authService.login(email, password);

  ctx.body = { user, token };
};

export default {
  login,
};
