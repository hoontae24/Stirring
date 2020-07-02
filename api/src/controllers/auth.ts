import { env, errors } from '@/consts';
import * as Services from '@/services';

import Controller from './Controller';

class Auth extends Controller {
  private authService: Services.auth;

  public constructor(deps: {
    services?: mapInstances<typeof Services>;
  }) {
    super();
    if (!deps.services) {
      throw new Error('No services in controller constructor');
    }
    this.authService = deps.services.auth;
  }

  public inspectAuth: Middleware = async (ctx, next) => {
    const token = ctx.headers[env.ACCESS_TOKEN_KEY];
    if (token) {
      const { account } = await this.authService.verifyToken(token);
      if (account) {
        ctx.account = account;
      }
    }
    ctx.response.set(env.ACCESS_TOKEN_KEY, token);
    await next();
  };

  public register: Middleware = async (ctx) => {
    const { name, email, password } = ctx.request.body;
    const account = await this.authService.register(
      name,
      email,
      password,
    );
    ctx.body = { account };
  };

  public login: Middleware = async (ctx) => {
    const { request } = ctx;
    const { email, password } = request.body;

    const { account, token } = await this.authService.login(
      email,
      password,
    );

    ctx.response.set(env.ACCESS_TOKEN_KEY, token);
    ctx.body = { account, token };
  };

  public verify: Middleware = async (ctx) => {
    const token = ctx.headers[env.ACCESS_TOKEN_KEY];
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

  public requireLogin: Middleware = async (ctx, next) => {
    if (!ctx.account) {
      throw errors.AUTH_REQUIRED_LOGIN;
    }
    return next();
  };
}

export default Auth;
