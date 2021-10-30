const mongoose = require('mongoose')

const infoItemSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'info_category'
  },
  name: String
})

module.exports = mongoose.model('info_item', infoItemSchema)
