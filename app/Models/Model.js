const inflection = require('inflection')
const _get = require('lodash.get')
const DataSet = require('./DataSet')
const { ObjectID } = require('mongodb')
module.exports = class Model {

  constructor(attr = {}) {
    this.fill(attr)
    return this
  }

  static get computed() { return _get(this._config, 'computed', []) }
  static get hidden() { return _get(this._config, 'hidden', []) }
  static get listFields() { return _get(this._config, 'listFields', []) }

  static boot() {

    if (this._booted) {
      return
    }
    this._config = {}
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
    return this
  }

  /**
   * 
   * @param {string} collectionName collection name
   * @param {Object} config Model config
   */
  static use(collectionName, config = {}) {
    this._config = config
    return this.setCollectionName(collectionName)
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
    if (!options.projection && this.listFields.length > 0) {
      options.projection = this.listFields
    }
    return options
  }

  static async findOne(where, options = {}) {
    options = this.fixQueryOptions(options)
    if (typeof where === 'string') {
      where = { _id: ObjectID(where) }
    }
    const data = await this.col.findOne(where, options)
    return new this(data)
  }

  static async find(where, options = {}) {
    options = this.fixQueryOptions(options)
    const data = await this.col.find(where, options).toArray()
    const ret = new DataSet()
    for (let row of data) {
      ret.push(new this(row))
    }
    return ret
  }

  toJSON() {
    const ret = {}
    const self = this.constructor
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