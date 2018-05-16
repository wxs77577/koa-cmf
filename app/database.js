const { MongoClient, ObjectID } = require('mongodb')


module.exports = () => {
  return new Promise((resolve, reject) => {
    const DB = process.env.DB || 'mongodb://127.0.0.1:27017/test'
    const dbName = process.env.DB.split('/').pop()
    MongoClient.connect(DB, {
      useNewUrlParser: true
    }, (err, client) => {
      if (err) {
        reject(err)
        return
      }
      const db = client.db(dbName)
      resolve(db)
    })
  })
}