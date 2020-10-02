import { keyBy, isArray } from 'lodash';
import { Op } from 'sequelize';

import * as models from '@/models';

import Service from './Service';

class Post extends Service {
  private postModel: typeof models.Post;
  private resourceModel: typeof models.Resource;

  public constructor(deps: { models?: typeof models }) {
    super();
    if (!deps.models || !deps.models.Post) {
      throw new Error(
        'No models injected on auth service constructor',
      );
    }
    this.postModel = deps.models.Post;
    this.resourceModel = deps.models.Resource;
  }

  public create = async (data: {
    authorId: string;
    resourceIds: string[];
  }) => {
    return this.postModel.create(data);
  };

  public list = async () => {
    let posts = await this.postModel.findAll({
      include: [{ association: this.postModel.associations.author }],
    });

    posts = await this.withResource(posts);

    return posts;
  };

  public async withResource(posts: models.Post): Promise<models.Post>;
  public async withResource(
    posts: models.Post[],
  ): Promise<models.Post[]>;
  public async withResource(posts: models.Post | models.Post[]) {
    if (!posts) return;
    const isArr = isArray(posts);
    const concatenatedPosts = isArray(posts) ? posts : [posts];

    const resources = await this.resourceModel.findAll({
      where: {
        id: {
          [Op.in]: concatenatedPosts.reduce(
            (acc, post) => acc.concat(post.resourceIds || []),
            [] as string[],
          ),
        },
      },
    });
    const resourceDictById = keyBy(resources, 'id');
    const postsWithResources = concatenatedPosts.map((post) => ({
      ...(post.toJSON() as models.Post),
      resources: (post.resourceIds || []).map(
        (id) => resourceDictById[id],
      ),
    }));

    return isArr ? postsWithResources : postsWithResources[0];
  }
}

export default Post;
