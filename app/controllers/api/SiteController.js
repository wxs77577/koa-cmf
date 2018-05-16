const Model = require('../../models/Model')

module.exports = class SiteController {
  async login(ctx) {
    const { mobile, password } = ctx.request.body
    const bcrypt = require('bcryptjs')
    const jwt = use('components/jwt')
    const user = await Model.use('users').findOne({ mobile })
    if (!user) {
      return ctx.throw(404, 'User does not exist.')
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return ctx.throw(404, 'Incorrect password.')
    }
    ctx.body = {
      token: jwt.sign({ id: user._id }),
      user: user.toJSON()
    }
  }
}