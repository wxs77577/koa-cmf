module.exports = (config = {}) => async (ctx, next) => {
  const { ObjectID } = require('mongodb')
  //your code

  let token = ctx.query.token
  if (ctx.header.authorization) {
    token = String(ctx.headers.authorization).split(' ').pop()
  }
  const Model = require('../models/Model')
  if (token) {
    const jwt = use('components/jwt')
    try {
      const data = jwt.verify(token)
      ctx.user = await Model.use('users').findOne(ObjectID(data.id))
    } catch (e) {
      ctx.throw(400, e.message)
    }
  }
  await next()
}