require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const KoaBody = require('koa-body')
const app = new Koa()
const router = new Router()

app.use(KoaBody())

require('./Routes')(app)

router.get('/', ctx => ctx.body = 'Home')

app.use(router.routes(), router.allowedMethods())
const Model = require('./Models/Model')
Model.initConnection().then(async () => {
  const Course  = require('./Models/Course')
  const model = await Model.setCollectionName('ads').find()
  if (!model) {
    return console.error('404')
  }
  console.log(model)
})

async function main () {
  
  // const ret = await Course.query().findOne({}, {projection: {title: 1}})
  // console.log(ret)
}

// main()

module.exports = app