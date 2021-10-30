/* eslint-disable space-unary-ops */
/* eslint-disable no-unused-vars */
const attendances = require('../domain/models/attendance')
const childs = require('../domain/models/child')
const childDynamic = require('../domain/models/child_dynamic')
const gadgets = require('../domain/models_v2/gadget')
const healths = require('../domain/models_v2/health')
const rooms = require('../domain/models/enrollment')

const {
  sendErrorResponse,
  sendSuccessResponse
} = require('../helpers/apiResponse')
const {
  findAmountDay,
  prepareGadgetInfo,
  prepareHealthInfo,
  getConditionMonthValue
} = require('../helpers/dateConvert')
const { stringToObjectId } = require('../domain/models/roomType')

module.exports = {
  async searchName (req, res) {
    const { position } = req
    const { searchKey } = req.query

    if (
      position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher'
    ) {
      try {
        const result = await childs.findOne({
          $text: { $search: searchKey }
        })

        if (result) {
          sendSuccessResponse(res, result._id)
        } else {
          sendSuccessResponse(res, result)
        }
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },

  async getAttendChartInfo (req, res) {
    const { position } = req

    if (
      position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher'
    ) {
      const { date } = req.query
      let { childId } = req.query
      const dateCondition = getConditionMonthValue(date, findAmountDay)
      if (childId === 'กรุณาเลือกเด็กก่อน') {
        childId = null
      }
      try {
        const attendInfo = await attendances.find({
          date: {
            $gte: dateCondition.greaterThanDate,
            $lte: dateCondition.lessThanDate
          },
          child: childId
        })
        let attendAmount = 0
        let absentAmount = 0
        for (let i = 0; i < attendInfo.length; i++) {
          if (attendInfo[i].attend) {
            attendAmount++
          } else {
            absentAmount++
          }
        }

        sendSuccessResponse(res, {
          attendInfo: [attendAmount],
          absentInfo: [absentAmount],
          total: dateCondition.amountDay
        })
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },
  async getCheckInfo (req, res) {
    try {
      const { position } = req
      if (position === 'admin' || position === 'accountant' || position === 'teacher') {
        const { childId, date } = req.query
        const listResult = []

        if (childId === 'กรุณาเลือกเด็กก่อน' || childId === null || childId === undefined) {
          res.status(400).end()
          return 0
        }

        const attendInfo = await attendances.findOne({ child: childId, date })

        if (attendInfo !== null) {
          listResult.push(attendInfo.attend)
        } else {
          listResult.push(null)
        }
        const gadgetInfo = await gadgets.findOne({ child: childId, date })

        if (gadgetInfo !== null) {
          listResult.push(gadgetInfo.milk)
          listResult.push(gadgetInfo.pamper)
          listResult.push(gadgetInfo.bottle)
          listResult.push(gadgetInfo.milk_bottle)
          listResult.push(gadgetInfo.towel)
        } else {
          for (let i = 0; i < 5; i++) {
            listResult.push(null)
          }
        }

        const healthInfo = await healths.findOne({ child: childId, date })

        if (healthInfo !== null) {
          listResult.push(healthInfo.breakfast)
          listResult.push(healthInfo.cloth)
          listResult.push(healthInfo.head)
          listResult.push(healthInfo.ear)
          listResult.push(healthInfo.nail)
          listResult.push(healthInfo.skin)
          listResult.push(healthInfo.wound)
          listResult.push(healthInfo.temperature)
        } else {
          for (let i = 0; i < 8; i++) {
            listResult.push(null)
          }
        }

        res.json({ message: 'รับทุกข้อมูลเช็ครายวัน', data: listResult })
      } else {
        console.log('คุณไม่มีสิทธื์เข้าถึงหน้านี้')
        res.status(403).end()
      }
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async getGadgetInfo (req, res) {
    const { position } = req

    if (
      position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher'
    ) {
      const { date } = req.query
      let { childId } = req.query

      const dateCondition = getConditionMonthValue(date, findAmountDay)
      if (childId === 'กรุณาเลือกเด็กก่อน') {
        childId = null
      }
      try {
        const gadgetInfo = await gadgets.find({
          date: {
            $gte: dateCondition.greaterThanDate,
            $lte: dateCondition.lessThanDate
          },
          child: childId
        })
        const result = prepareGadgetInfo(gadgetInfo, dateCondition)
        sendSuccessResponse(res, result)
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },
  async getHealthInfo (req, res) {
    const { position } = req
    if (
      position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher'
    ) {
      const { date } = req.query
      let { childId } = req.query

      const dateCondition = getConditionMonthValue(date, findAmountDay)
      if (childId === 'กรุณาเลือกเด็กก่อน') {
        childId = null
      }
      try {
        const healthInfo = await healths.find({
          date: {
            $gte: dateCondition.greaterThanDate,
            $lte: dateCondition.lessThanDate
          },
          child: childId
        })
        const result = prepareHealthInfo(healthInfo, dateCondition)
        sendSuccessResponse(res, result)
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },

  async getQuitChildInfo (req, res) {
    try {
      const { position } = req
      if (position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher') {
        const childList = []
        const childQuitList = []
        const childNotQuitList = []
        const allChild = []
        const allEnrollInfo = await rooms.find({}).populate('child')
        const endDateNull = await rooms.find({ endDate: null })

        for (let i = 0; i < endDateNull.length; i++) {
          const childId = endDateNull[i].child.toString()
          if (childNotQuitList.indexOf(childId) === -1) {
            childNotQuitList.push(childId)
          }
        }
        // console.log('---Live--')
        for (let i = 0; i < allEnrollInfo.length; i++) {
          const childId = allEnrollInfo[i].child._id
          if (allChild.indexOf(childId) === -1) {
            allChild.push(childId.toString())
          }
        }
        // console.log('--All---')
        for (let i = 0; i < allChild.length; i++) {
          if (childNotQuitList.indexOf(allChild[i]) === -1) {
            childNotQuitList.push(allChild[i])
            childQuitList.push(allChild[i])
          }
        }
        // console.log('---Quit----')
        for (let i = 0; i < childQuitList.length; i++) {
          const childInfo = await rooms.findOne({ child: childQuitList[i] }).sort({ endDate: 'desc' }).populate('child').populate('room')
          const photoInfo = await childDynamic.findOne({ child: childQuitList[i] })
          const photoLength = photoInfo.photo.length

          childList.push({
            _id: childInfo.child._id,
            name: `${childInfo.child.firstname} ${childInfo.child.middlename} ${childInfo.child.lastname}`,
            nickname: childInfo.child.nickname,
            room: childInfo.room.name,
            endDate: childInfo.endDate.toString().slice(0, 24),
            photoUrl: photoInfo.photo[photoLength - 1].value
          })
        }
        res.json({ message: 'ลิสต์ข้อมุลคร่าวๆของเด็กที่ลาออกจากnurseryไปแล้ว', data: childList })
      } else {
        res.status(403).end()
        return 0
      }
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },
  async getAllAmount (req, res) {
    try {
      const { position } = req
      if (position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher') {
        let firstCount = 0
        let secondCount = 0
        let thridCount = 0
        let forthCount = 0
        const childPresent = await rooms.find({ endDate: null })
        for (let i = 0; i < childPresent.length; i++) {
          if (childPresent[i].room.toString() === '5fc62c42859bd78a633e6221') { // ห้อง ก1
            firstCount ++
          } else if (childPresent[i].room.toString() === '5fc62ce3859bd78a633e6222') { // ห้อง ก2
            // eslint-disable-next-line no-unused-vars
            secondCount++
          } else if (childPresent[i].room.toString() === '5fc62ce7859bd78a633e6223') { // ห้อง ก3
            // eslint-disable-next-line no-unused-vars
            thridCount++
          } else if (childPresent[i].room.toString() === '5fc62ce7859bd78a633e6224') { // ห้อง ก4
            // eslint-disable-next-line no-unused-expressions
            forthCount++
          }
        }
        sendSuccessResponse(res, [firstCount, secondCount, thridCount, forthCount])
      } else {
        res.status(401).json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
        return 0
      }
    } catch (error) {
      console.log(error)
      sendErrorResponse(res, error)
    }
  }

}
