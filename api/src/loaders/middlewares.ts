import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';

import { env } from '@/consts';

const loader: AppInitializer = async ({ app }) => {
  // Initialize server app with middlewares

  app.use(logger());
  app.use(cors({ exposeHeaders: [env.ACCESS_TOKEN_KEY] }));
  app.use(bodyParser());

  return { app };
};

export default loader;
