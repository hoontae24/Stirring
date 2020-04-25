import Application, { Middleware as _Middleware } from 'koa';
import { Sequelize } from 'sequelize';

import { models } from '@/db';
import * as services from '@/services';
import * as controllers from '@/controllers';

declare global {
  type AppInitializer = (
    appData: AppInitialParams,
  ) => Promise<AppInitialParams>;
  interface AppInitialParams {
    app: App;
  }
  interface App extends Application {
    sequelize?: Sequelize;
    models?: typeof models;
    services?: mapInstances<typeof services>;
    controllers?: mapInstances<typeof controllers>;
  }

  namespace Koa {
    export interface CustomState {}
    export interface CustomContext {
      account?: models.Account;
    }
    export type Middleware = _Middleware<CustomState, CustomContext>;
  }

  type valueof<T> = T extends any[] ? T[number] : T[keyof T];
  type mapInstances<T extends {}> = {
    [key in keyof T]: valueof<T[key]>;
  };
}
