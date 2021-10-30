const enroll = require('../domain/models/enrollment')
const room = require('../domain/models/rooms')

const {
  sendSuccessResponse,
  sendErrorResponse
} = require('../helpers/apiResponse')
const { stringToObjectId } = require('../domain/models/roomType')

module.exports = {
  async createRoom (req, res) {
    const { position } = req
    if (position === 'admin') {
      try {
        const result = await room.create(req.body)
        console.log('Create collection success')
        sendSuccessResponse(res, result)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async enrollRoom (req, res) {
    const { child_id, room_id, startDate } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        const result = await enroll.create(
          {
            child: child_id,
            room: room_id,
            startDate,
            endDate: ''
          })
        sendSuccessResponse(res, result)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async quitRoom (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'accountant') {
      const { id } = req.body
      const filter = { child: id, endDate: null }
      const update = { $set: { endDate: new Date() } }
      try {
        const result = await enroll.findOneAndUpdate(filter, update).populate('room')
        // console.log('Child leave', result.room.name)
        res.status(204).end()
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res.status(403).end()
      return 0
    }
  },

  async updateRoom (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'accountant') {
      let { _id, room } = req.body
      room = stringToObjectId(room)
      try {
        await enroll.updateOne(
          { child: _id, endDate: null },
          { endDate: new Date() }
        )

        await enroll.create({
          child: _id,
          room,
          startDate: new Date(),
          endDate: ''
        })
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  }

}
