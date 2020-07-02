import Application, {
  Middleware as _Middleware,
  DefaultState,
  DefaultContext,
  ParameterizedContext as _ParameterizedContext,
} from 'koa';
import Router from 'koa-router';
import { Sequelize } from 'sequelize';

import * as models from '@/models';
import * as services from '@/services';
import * as controllers from '@/controllers';

declare global {
  type AppInitializer = (
    appData: AppInitialParams,
  ) => Promise<AppInitialParams>;
  interface AppInitialParams {
    app: App;
    routePrefix?: string;
  }

  interface App extends Application {
    sequelize: Sequelize;
    models: typeof models;
    services: mapInstances<typeof services>;
    controllers: mapInstances<typeof controllers>;
    router: Router;
  }

  interface Middleware extends Router.IMiddleware {}

  type valueof<T> = T extends any[] ? T[number] : T[keyof T];
  type mapInstances<T extends {}> = {
    [key in keyof T]: valueof<T[key]>;
  };
}

declare module 'koa-router' {
  export interface IRouterParamContext {
    account?: models.Account;
  }
}
