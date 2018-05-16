require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const app = new Koa()
const router = new Router()
global.use = path => require(__dirname + '/' + path.replace(/\./g, '/'))
global.m = name => use('models/' + name)

app.use(KoaBody())

require('./routes')(app)

router.get('/', ctx => ctx.body = 'Home')

app.use(router.routes(), router.allowedMethods())
const Model = require('./models/Model')
app.Model = Model
Model.initConnection().then(async () => {

  return
  const Course = require('./models/Course')
  const model = await Model.use('users', {
    
  }).findOne({})
  if (!model) {
    return console.error('404')
  }
  console.log(model.toJSON())
})

module.exports = app