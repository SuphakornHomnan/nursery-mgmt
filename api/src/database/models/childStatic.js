const mongoose = require('mongoose')

const childStaticSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },

  race: String,
  nationality: String,
  religion: String,
  number_of_siblings: Number,
  child_number: Number,
  application_date: Date
})

module.exports = mongoose.model('childsStatic', childStaticSchema)
