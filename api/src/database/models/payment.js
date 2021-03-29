const mongoose = require('mongoose')

const paymentSchema = mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },
  start_date: Date,
  expDate: Date,
  updateOn: Date,
  topic: String,
  type: String,
  total_price: Number,
  outstanding_balance: Number,
  status: String,
  slipNo: Number,
  invoiceNum: Number,
  amount: Number,
  slip: [String]
}).index({
  slipNo: 1
}, { unique: true }).index({
  invoiceNum: 1
}, { unique: true })

module.exports = mongoose.model('payment', paymentSchema)
