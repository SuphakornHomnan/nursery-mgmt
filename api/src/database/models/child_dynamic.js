const mongoose = require('mongoose')

const childDynamicSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },
  history_accident: [String],
  immunization_record: [String],
  weight: [
    {
      value: Number,
      date: Date
    }
  ],
  height: [
    {
      value: Number,
      date: Date
    }
  ],
  photo: [
    {
      value: String,
      date: Date
    }
  ]
})

module.exports = mongoose.model('childsDynamic', childDynamicSchema)
