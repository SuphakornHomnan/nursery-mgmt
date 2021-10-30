const mongoose = require('mongoose')

const gadgetSchema = mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs'
  },
  date: Date,
  updateOn: Date,
  milk: Boolean,
  pamper: Boolean,
  bottle: Boolean,
  milk_bottle: Boolean,
  towel: Boolean
})

module.exports = mongoose.model('gadgets', gadgetSchema)
