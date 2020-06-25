import * as models from '@/models';

import Service from './Service';

class Post extends Service {
  private postModel: typeof models.Post;

  public constructor(deps: { models?: typeof models }) {
    super();
    if (!deps.models || !deps.models.Post) {
      throw new Error(
        'No models injected on auth service constructor',
      );
    }
    this.postModel = deps.models.Post;
  }
}

export default Post;
