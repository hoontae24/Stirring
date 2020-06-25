import * as Services from '@/services';

import Controller from './Controller';

class Post extends Controller {
  private postService: Services.post;

  public constructor(deps: {
    services?: mapInstances<typeof Services>;
  }) {
    super();
    if (!deps.services) {
      throw new Error('No services in controller constructor');
    }
    this.postService = deps.services.post;
  }

  public create: Koa.Middleware = (ctx, next) => {
    // this.postService;
  };
}

export default Post;
