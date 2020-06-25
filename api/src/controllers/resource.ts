import * as Services from '@/services';

import Controller from './Controller';

class Resource extends Controller {
  private resourceService: Services.resource;

  public constructor(deps: {
    services?: mapInstances<typeof Services>;
  }) {
    super();
    if (!deps.services) {
      throw new Error('No services in controller constructor');
    }
    this.resourceService = deps.services.resource;
  }

  public create: Koa.Middleware = async (ctx) => {
    const files = ctx.request.files;
    const resources = await this.resourceService.create(files);
    ctx.body = { resources };
  };
}

export default Resource;
