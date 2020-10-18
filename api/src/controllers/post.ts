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

  /**
   *
   * IF req.body.mode === 'multiple' THEN \
   * create a post with multiple images, \
   * ELSE \
   * create posts with each image. \
   * ENDIF
   *
   */
  public create: Middleware = async (ctx) => {
    const { mode } = ctx.request.body;
    const files = ctx.request.files;
    const resources = await this.resourceService.create(files);

    const authorId = ctx.account!.id;
    const multiple = mode === 'multiple';
    const result = {
      [multiple ? 'posts' : 'post']: multiple
        ? await this.postService.create({
            authorId,
            resourceIds: resources.map(({ id }) => id),
          })
        : await Promise.all(
            resources.map((rsc) =>
              this.postService.create({
                authorId,
                resourceIds: [rsc.id],
              }),
            ),
          ),
    };

    ctx.body = { ...result };
  };

  public list: Middleware = async (ctx) => {
    const posts = await this.postService.list();

    ctx.body = { posts };
  };

  public retrieve: Middleware = async (ctx) => {
    const { id } = ctx.params;

    const post = id ? await this.postService.retrieve(id) : null;

    ctx.body = { post };
  };
}

export default Post;
