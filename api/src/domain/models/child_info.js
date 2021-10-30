const mongoose = require('mongoose')

const childInfoSchema = mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs'
  },
  infoItem: [
    {
      info_item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'info_item'
      },
      itemDetail: String
    }
  ],
  other: String
})

module.exports = mongoose.model('child_info', childInfoSchema)
