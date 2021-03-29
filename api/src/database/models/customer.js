const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
  _id: {
    type: String,
    require: true
  },
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },
  createdAt: Date
})

module.exports = mongoose.model('customers', customerSchema)
