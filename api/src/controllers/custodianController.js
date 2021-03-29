const guardians = require('../database/models/guardian')

const {
  sendSuccessResponse,
  sendErrorResponse
} = require('../helpers/apiResponse')

module.exports = {
  async updateFatherName (req, res) {
    const { _id, name } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        const result = await guardians.updateOne(
          { child: _id, relationship: 'father' },
          { name }
        )
        sendSuccessResponse(res, result, 204)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  },

  async updateFatherPhone (req, res) {
    const { _id, telephone } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        const result = await guardians.updateOne(
          { child: _id, relationship: 'father' },
          { telephone }
        )
        sendSuccessResponse(res, result, 204)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  },

  async updateMotherName (req, res) {
    const { _id, name } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        const result = await guardians.updateOne(
          { child: _id, relationship: 'mother' },
          { name }
        )
        sendSuccessResponse(res, result, 204)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  },

  async updateMotherPhone (req, res) {
    const { _id, telephone } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        const result = await guardians.updateOne(
          { child: _id, relationship: 'mother' },
          { telephone }
        )
        sendSuccessResponse(res, result, 204)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  }

}
