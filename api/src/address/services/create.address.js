const { AddressModel } = require('../domain/address.entity')

module.exports = {
  async createAddress(req, res) {
    try {
      const newAddress = await AddressModel.create(req.body)
      return res.status(201).json(newAddress)
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
        error: 'Bad Request',
      })
    }
  },
}
