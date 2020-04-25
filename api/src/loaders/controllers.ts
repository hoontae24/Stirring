import lodash from 'lodash';

import * as Controllers from '@/controllers';

const init: AppInitializer = async ({ app }) => {
  const controllers = lodash.fromPairs(
    lodash
      .entries(Controllers)
      .map(([key, Contructor]) => [key, new Contructor(app)]),
  );

  app.controllers = controllers as any;

  return { app };
};

export default init;
