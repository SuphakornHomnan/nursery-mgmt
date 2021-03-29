const mongoose = require('mongoose')

const healthSchema = mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs'
  },
  check_outside: {
    breakfast: Boolean,
    cloth: Boolean
  },
  check_inside: {
    head: Boolean,
    ear: Boolean,
    nail: Boolean,
    skin: Boolean,
    temperature: Boolean,
    wound: Boolean
  },
  date: Date,
  updateOn: Date
}).index({
  child: 1, date: 1
}, { unique: true })

module.exports = mongoose.model('healths', healthSchema)
