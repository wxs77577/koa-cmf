const app = require('./app')

const PORT = process.env.PORT || 7777
app.listen(PORT)
console.log(`http://localhost:${PORT}`)