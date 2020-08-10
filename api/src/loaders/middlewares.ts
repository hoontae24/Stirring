import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import cors from '@koa/cors';
import multer from '@koa/multer';
import statics from 'koa-static';

import { env, uploadDir } from '@/consts';
import { mkdirIfNotExist } from '@/lib';

const CWD = process.cwd();

const loader: AppInitializer = async ({ app }) => {
  // Initialize server app with middlewares

  app.use(logger());
  app.use(cors({ exposeHeaders: [env.ACCESS_TOKEN_KEY] }));
  app.use(statics(`${CWD}/uploads`));
  app.use(bodyParser());
  app.use(multer({ dest: uploadDir }).array('files'));
  mkdirIfNotExist(uploadDir);

  return { app };
};

export default loader;
