import Controller from './Controller';

class Status extends Controller {
  public check: Koa.Middleware = async ctx => {
    ctx.body = 'OK';
  };
}

export default Status;
