import Controller from './Controller';

class Status extends Controller {
  public check: Middleware = async (ctx) => {
    ctx.body = 'OK';
  };
}

export default Status;
