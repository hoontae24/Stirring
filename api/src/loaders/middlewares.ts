import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';

const loader: AppInitializer = async ({ app }) => {
  // Initialize server app with middlewares

  app.use(logger());
  app.use(cors());
  app.use(bodyParser());

  return { app };
};

export default loader;
