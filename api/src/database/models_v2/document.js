const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
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
      status: Boolean
    }
  ]
})

module.exports = mongoose.model('documents', documentSchema)
