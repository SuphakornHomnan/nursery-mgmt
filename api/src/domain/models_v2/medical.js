const mongoose = require('mongoose')

const medicalSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },
  info: [
    {
      info_item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'info_item'
      },
      detail: String
    }
  ],
  hospital: [
    {
      value: String,
      date: Date
    }
  ]
})

module.exports = mongoose.model('medicals', medicalSchema)
