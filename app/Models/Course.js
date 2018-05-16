const Model = require('./Model')

module.exports = class Course extends Model {
  static get computed() {
    return ['name']
  }

  get name() {
    return this.created_at
  }

  static get listFields() {
    return [
      '_id', 'created_at', 'title', 'description'
    ]
  }
}