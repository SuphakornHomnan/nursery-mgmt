const { AddressModel } = require('../domain/address.entity')

module.exports = {
  async getAddress(req, res) {
    try {
      const address = await AddressModel.findOne({ child: req.body.id })
      return res.json(address)
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
        error: 'Bad Request',
      })
    }
  },
}
