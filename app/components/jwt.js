const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET
module.exports = {
  sign(data) {
    return jwt.sign(data, SECRET)
  },
  verify(token) {
    return jwt.verify(token, SECRET)
  }
}