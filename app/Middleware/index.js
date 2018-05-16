const query = async (ctx, next) => {
  try {
    ctx.query = JSON.parse(ctx.request.query.query)
  } catch (e) {}
  await next()
}
const resource = async (ctx, next) => {
  ctx.resource = ctx.params.resource
  await next()
}

module.exports = {
  query,
  resource
}