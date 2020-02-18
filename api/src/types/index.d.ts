import Application, { Middleware as _Middleware } from 'koa';

declare global {
  interface AppInitialProps {
    app: Application;
  }
  type AppInitializer = (appData: AppInitialProps) => Promise<AppInitialProps>;

  namespace Koa {
    export interface CustomState {}
    export interface CustomContext {
      user?: Model.User;
    }
    export type Middleware = _Middleware<CustomState, CustomContext>;
  }
}
