const address = require('../database/models/address')

const {
  sendSuccessResponse,
  sendErrorResponse
} = require('../helpers/apiResponse')

module.exports = {
  async createAddressInfo (req, res) {
    const {
      id,
      name_village,
      house_number,
      moo,
      sub_district,
      district,
      province,
      telephone,
      house_map
    } = req.body
    const { position } = req

    if (position === 'admin' || position === 'accountant') {
      try {
        const addressInfo = await address.create({
          child: id,
          name_village,
          house_number,
          moo,
          sub_district,
          district,
          province,
          telephone,
          house_map
        })
        sendSuccessResponse(res, addressInfo)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  },

  async getAddressInfo (req, res, next) {
    const { position } = req

    if (position === 'admin' || position === 'accountant') {
      try {
        const addressInfo = await address.findOne({ child: req.body.id })
        sendSuccessResponse(res, addressInfo)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  }
}
