import lodash from 'lodash';

import * as Services from '@/services';

const init: AppInitializer = async ({ app }) => {
  const services = lodash.fromPairs(
    lodash
      .entries(Services)
      .map(([key, Contructor]) => [key, new Contructor(app)]),
  );

  app.services = services as any;

  return { app };
};

export default init;
