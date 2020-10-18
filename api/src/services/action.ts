import { WhereOptions } from 'sequelize';

import * as models from '@/models';

import Service from './Service';

class Action extends Service {
  private actionModel: typeof models.Action;

  public constructor(deps: { models?: typeof models }) {
    super();
    if (!deps.models || !deps.models.Action) {
      throw new Error(
        'No models injected on action service constructor',
      );
    }
    this.actionModel = deps.models.Action;
  }

  public create = async (
    data: Pick<
      models.Action,
      'type' | 'actorId' | 'targetId' | 'targetKind' | 'data'
    >,
  ) => {
    return this.actionModel.create(data);
  };

  public list = async (params?: Partial<models.Action>) => {
    const { type, actorId, targetId, targetKind, deletedAt } =
      params || {};
    const where: WhereOptions = {};
    if (type !== undefined) where.type = type;
    if (actorId !== undefined) where.actorId = actorId;
    if (targetId !== undefined) where.targetId = targetId;
    if (targetKind !== undefined) where.targetKind = targetKind;
    if (deletedAt !== undefined) where.deletedAt = deletedAt;

    return this.actionModel.findAll({ where });
  };

  public remove = async (id: string) => {
    const action = this.actionModel.findByPk(id);
    if (action) {
      await this.actionModel.destroy({ where: { id } });
    }
    return action;
  };
}

export default Action;
