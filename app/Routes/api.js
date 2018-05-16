

module.exports = app => {
  const Model = require('../models/Model')
  const middleware = require('../middleware')
  const Router = require('koa-router')
  const router = new Router({
    prefix: '/api',
  })
  Router.prototype

  router.use(middleware.auth(), middleware.query())

  router.get('/', async ctx => {
    ctx.body = {
      resource: router.url('resource', 'courses')
    }
  })
  const UserController = require('../controllers/api/SiteController')
  const ctl = new UserController
  router.post('/login', ctl.login)

  router.get('resource.show', '/:resource/:id', middleware.resource(), async ctx => {
    ctx.body = await Model.use(ctx.resource).findOne(ctx.params.id)
  })

  router.get('resource.index', '/:resource', middleware.resource(), async ctx => {
    const { page = 1, limit = 10 } = ctx.query
    const data = await Model.use(ctx.resource).find({}, {
      projection: { title: 1, cover: 1 },
      skip: (page - 1) * limit,
      limit: limit
    })
    ctx.body = {
      data: data
    }
  })
  

  app.use(router.routes())
}