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
}

export default Action;
