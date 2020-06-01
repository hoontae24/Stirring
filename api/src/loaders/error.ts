import ContextError from '@/lib/errors/ContextError';

const loader: AppInitializer = async ({ app }) => {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      // 4xx 관련 에러만 처리, 서버 로직에러는 응답하지않음.
      if (e instanceof ContextError) {
        ctx.status = e.status;
        ctx.body = { ...e.payload, error: e.toJson() };
        return;
      }
      throw e;
    }
  });

  return { app };
};

export default loader;
