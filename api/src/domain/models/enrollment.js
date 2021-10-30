const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs'
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'rooms',
    require: true
  },
  startDate: Date,
  endDate: Date
})

module.exports = mongoose.model('enrollment', enrollmentSchema)
