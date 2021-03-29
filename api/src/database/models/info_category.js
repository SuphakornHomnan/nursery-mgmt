const mongoose = require('mongoose')

const infoCategorySchema = mongoose.Schema({
  name: String
})

module.exports = mongoose.model('info_category', infoCategorySchema)
