export default async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    ctx.body = {
      error: error.message,
    };
    ctx.app.emit('error', error);
  }
};
