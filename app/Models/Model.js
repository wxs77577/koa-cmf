const inflection = require('inflection')

module.exports = class Model {
  constructor(attr = {}) {
    this.fill(attr)
    return this
  }

  static get computed() { return [] }
  static get hidden() { return [] }
  static get listFields() { return [] }

  static boot() {
    if (this._booted) {
      return
    }

    this._booted = true
  }

  static initConnection() {
    return require('../database')().then(db => {
      this.db = db
    }).catch(e => {
      throw new Error(e.message)
    })
  }

  static setCollectionName(name) {
    this._collectionName = name
  }
  static get collectionName() {
    return this._collectionName || inflection.pluralize(inflection.underscore(this.name))
  }

  static collection(name) {
    return this.db.collection(name)
  }

  static get col() {
    return this.collection(this.collectionName)
  }

  static query() {
    this.boot()
    return this.col
  }

  static fixQueryOptions(options) {
    if (!options.projection) {
      options.projection = this.listFields
    }
    return options
  }

  static async findOne(where, options = {}) {
    options = this.fixQueryOptions(options)
    const data = await this.col.findOne(where, options)
    return new this(data)
  }

  static async find(where, options = {}) {
    options = this.fixQueryOptions(options)
    const data = await this.col.find(where, options).toArray()
    const ret = new Set()
    for (let row of data) {
      ret.push(new this(row))
    }
    return ret
  }

  static dataset () {
    return new Set()
  }

  toJSON() {
    const ret = {}
    const self =  this.constructor
    Object.entries(this).map(([k, v]) => {
      ret[k] = v
    })
    self.computed.map(v => {
      ret[v] = this[v]
    })
    self.hidden.map(v => {
      delete ret[v]
    })
    return ret
  }

  fill(data) {
    if (!data) {
      return
    }
    Object.entries(data).map(([k, v]) => {
      this[k] = v
    })
  }

  async save() {
    const isUpdate = !!this._id
  }


}