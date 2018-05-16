

module.exports = app => {
  const middleware = require('../Middleware')
  const Router = require('koa-router')
  const router = new Router({
    prefix: '/api',
  })

  router.use(middleware.query)

  router.get('/', async ctx => {
    ctx.body = {
      resource: router.url('resource', 'courses')
    }
  })

  router.get('resource', '/:resource', middleware.resource, async ctx => {
    const ret = await app.m('courses').findOne()
    ctx.body = ret
  })

  app.use(router.routes())
}