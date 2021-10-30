const mongoose = require('mongoose')

const gadgetSchema = mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs'
  },
  date: Date,
  updateOn: Date,
  checkList: {
    milk: Boolean,
    pamper: Boolean,
    bottle: Boolean,
    milk_bottle: Boolean,
    towel: Boolean
  }
}).index({
  child: 1, date: 1
}, { unique: true })

module.exports = mongoose.model('gadget', gadgetSchema)
