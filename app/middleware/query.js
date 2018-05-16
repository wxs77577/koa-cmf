
module.exports = (config = {}) => async (ctx, next) => {
  try {
    let query = ctx.request.query.query || ctx.request.body.query
    ctx.query = JSON.parse(query)
  } catch (e) {}
  await next()
}