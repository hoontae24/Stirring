import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';

import { authController } from '@/controllers';

const loader: AppInitializer = async ({ app }) => {
  // Initialize server app with middlewares

  app.use(logger());
  app.use(cors());
  app.use(bodyParser());

  app.use(authController.inspectAuth);

  return { app };
};

export default loader;
