import { createReadStream } from 'fs';
import multer from '@koa/multer';

import * as models from '@/models';
import { getImageSize } from '@/lib/image';

import Service from './Service';

class Resource extends Service {
  private resourceModel: typeof models.Resource;

  public constructor(deps: { models?: typeof models }) {
    super();
    if (!deps.models || !deps.models.Resource) {
      throw new Error(
        'No models injected on auth service constructor',
      );
    }
    this.resourceModel = deps.models.Resource;
  }

  public create = async (files: multer.File[]) => {
    if (!files || !files.length) return [];
    const data = await Promise.all(
      files.map(async (file) => {
        const imageSize = await getImageSize(file.path);
        const resource = {
          filename: file.filename,
          originalname: file.originalname,
          size: file.size,
          mimetype: file.mimetype,
          extension: file.originalname.split('.').pop(),
          meta: {
            width: imageSize.width,
            height: imageSize.height,
          },
        };
        return this.resourceModel.create(resource);
      }),
    );
    return data;
  };

  public retrieve = async (id: string) => {
    return this.resourceModel.findByPk(id);
  };

  public getReadStreamById = async (id: string) => {
    const resource = await this.resourceModel.findByPk(id);
    if (!resource) {
      return null;
    }
    return createReadStream('uploads/'.concat(resource.filename));
  };
}

export default Resource;
