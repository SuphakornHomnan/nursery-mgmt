const mongoose = require('mongoose')

const historyStockSchema = mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'stocks'
  },
  updateOn: Date,
  amount: Number,
  modify_by: String
})

module.exports = mongoose.model('history_stock', historyStockSchema)
