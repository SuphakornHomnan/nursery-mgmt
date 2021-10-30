const mongoose = require('mongoose')

const showStockSchema = mongoose.Schema({
  amount: Number,
  price: Number,
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stocks'
  }
})

module.exports = mongoose.model('show_stock', showStockSchema)
