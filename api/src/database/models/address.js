const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema({
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'childs',
    require: true
  },
  name_village: String,
  house_number: String,
  moo: String,
  sub_district: String,
  district: String,
  province: String,
  telephone: String,
  house_map: String
})

module.exports = mongoose.model('address', addressSchema)
