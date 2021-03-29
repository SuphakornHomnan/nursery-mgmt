const mongoose = require('mongoose')

const attendanceSchema = mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },
  date: Date,
  updateOn: Date,
  attend: Boolean
}).index({
  child: 1, date: 1
}, { unique: true })

module.exports = mongoose.model('attendances', attendanceSchema)
