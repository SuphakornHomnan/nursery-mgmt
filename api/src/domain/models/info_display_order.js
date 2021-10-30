const mongoose = require('mongoose')

const infoDisplaySchema = mongoose.Schema({
  category_order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'info_category'
    }
  ],
  infoItems: [
    {
      info_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'info_category'
      },
      info_items: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'info_item'
        }
      ]
    }
  ]
})

module.exports = mongoose.model('info_display_order', infoDisplaySchema)
