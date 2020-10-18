import { errors } from '@/consts';
import { isActionType } from '@/lib/action';
import * as Services from '@/services';

import Controller from './Controller';

class Action extends Controller {
  private actionService: Services.action;

  public constructor(deps: {
    services?: mapInstances<typeof Services>;
  }) {
    super();
    if (!deps.services) {
      throw new Error('No services in controller constructor');
    }
    this.actionService = deps.services.action;
  }

  public create: Middleware = async (ctx) => {
    const { type, targetId, targetKind, data } = ctx.request.body;
    const actorId = ctx.account?.id;

    if (!isActionType(type) || !actorId) {
      throw errors.ACTION_CREATE_INVALID_DATA;
    }
    const action = await this.actionService.create({
      type,
      actorId,
      targetId,
      targetKind,
      data,
    });

    ctx.body = { action };
  };

  public list: Middleware = async (ctx) => {
    const { type, actorId, targetId, targetKind } = ctx.request.query;

    const actions = await this.actionService.list({
      type,
      actorId,
      targetId,
      targetKind,
    });

    ctx.body = { actions };
  };

  public remove: Middleware = async (ctx) => {
    const { id } = ctx.params;

    const action = await this.actionService.remove(id);

    ctx.body = { action };
  };
}

export default Action;
