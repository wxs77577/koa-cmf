module.exports = class DataSet extends Array {
  toJSON() {
    const ret = []
    for (let row of this) {
      ret.push(row.toJSON())
    }
    return ret
  }
}