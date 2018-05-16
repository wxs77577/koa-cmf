const inflection = require('inflection')

module.exports = (config = {}) => async (ctx, next) => {
  const Model = require('../models/Model')

  const resource = config.resource || ctx.params.resource
  const collectionName = inflection.underscore(inflection.pluralize(resource))
  const className = inflection.classify(resource)
  const id = ctx.params.id
  ctx.resource = collectionName
  ctx.Model = Model.use(collectionName)
  if (id) {
    ctx.model = await ctx.Model.findOne({ _id: id })
  }
  await next()
}