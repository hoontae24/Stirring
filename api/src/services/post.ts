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

  public create = async (data: {
    authorId: string;
    resourceIds: string[];
  }) => {
    return this.postModel.create(data);
  };
}

export default Post;
