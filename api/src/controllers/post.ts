import * as Services from '@/services';

import Controller from './Controller';

class Post extends Controller {
  private postService: Services.post;
  private resourceService: Services.resource;

  public constructor(deps: {
    services?: mapInstances<typeof Services>;
  }) {
    super();
    if (!deps.services) {
      throw new Error('No services in controller constructor');
    }
    this.postService = deps.services.post;
    this.resourceService = deps.services.resource;
  }

  public create: Middleware = async (ctx) => {
    const files = ctx.request.files;
    const resources = await this.resourceService.create(files);
    const post = await this.postService.create({
      authorId: ctx.account!.id,
      resourceIds: resources.map(({ id }) => id),
    });

    ctx.body = { post };
  };

  public list: Middleware = async (ctx) => {
    const posts = await this.postService.list();

    ctx.body = { posts };
  };
}

export default Post;
