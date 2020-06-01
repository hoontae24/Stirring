import { config } from '@/consts';
import * as Services from '@/services';

import Controller from './Controller';

class Auth extends Controller {
  private authService: Services.auth;

  public constructor(deps: {
    services?: mapInstances<typeof Services>;
  }) {
    super();
    if (!deps.services)
      throw new Error('No services in controller constructor');
    this.authService = deps.services.auth;
  }

  public inspectAuth: Koa.Middleware = async (ctx, next) => {
    const token = ctx.cookies.get(config.ACCESS_TOKEN_NAME);
    if (token) {
      const { account } = await this.authService.verifyToken(token);
      if (account) {
        ctx.account = account;
      }
    }

    await next();
  };

  public register: Koa.Middleware = async (ctx) => {
    const { email, password } = ctx.request.body;

    const account = await this.authService.register(email, password);

    ctx.body = { account };
  };

  public login: Koa.Middleware = async (ctx) => {
    const { request } = ctx;
    const { email, password } = request.body;

    const { user, token } = await this.authService.login(
      email,
      password,
    );

    ctx.cookies.set(config.ACCESS_TOKEN_NAME, token, {
      httpOnly: true,
      maxAge: config.TOKEN_MAX_AGE,
    });
    ctx.body = { user, token };
  };

  public verify: Koa.Middleware = async (ctx) => {
    const token = ctx.cookies.get(config.ACCESS_TOKEN_NAME);
    if (token) {
      const { account, decoded } = await this.authService.verifyToken(
        token,
      );
      if (account) {
        ctx.body = { account, decoded };
        return;
      }
    }

    ctx.status = 401;
    ctx.body = 'No authorization';
  };
}

export default Auth;
