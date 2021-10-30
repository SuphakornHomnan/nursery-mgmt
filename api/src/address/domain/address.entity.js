const { Schema, model } = require('mongoose')
const { ADDRESS, CHILD } = require('../../utils/constant')
const addressModel = new Schema(
  {
    child: {
      type: Schema.Types.ObjectId,
      ref: CHILD,
      require: true,
    },
    name_village: String,
    house_number: String,
    moo: String,
    sub_district: String,
    district: String,
    province: String,
    telephone: String,
    house_map: String,
  },
  { timestamps: true }
)
const AddressModel = model(ADDRESS, addressModel)
module.exports = { AddressModel }
