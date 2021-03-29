const mongoose = require('mongoose')

const stockSchema = mongoose.Schema({
  itemCode: String,
  item: String,
  size: String
})

module.exports = mongoose.model('stocks', stockSchema)
