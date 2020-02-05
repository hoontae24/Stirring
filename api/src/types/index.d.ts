import Koa from 'koa';

declare global {
  interface AppInitialProps {
    app: Koa;
  }

  type AppInitializer = (appData: AppInitialProps) => Promise<AppInitialProps>;
}
