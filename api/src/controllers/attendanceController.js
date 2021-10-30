const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const attendances = require('../domain/models/attendance')
const rooms = require('../domain/models/enrollment')
const {
  sendSuccessResponse
} = require('../helpers/apiResponse')
const { convertNameMonth, convertNameDate } = require('../helpers/dateConvert')
const {
  getConditionMonthValue,
  findAmountDay
} = require('../helpers/dateConvert')
const {
  setInfoAttendanceModal,
  setInfoAttendanceTable
} = require('../helpers/handleArray')
const { stringToObjectId } = require('../domain/models/roomType')

module.exports = {

  async checkAttendance (req, res) {
    const { child, attend } = req.body
    const { position } = req
    let { date } = req.body
    date = date + 'T00:00:00.000Z'

    if (position === 'admin' || position === 'teacher') {
      try {
        if (attend !== null) {
          const oneDayCheck = await attendances.findOneAndUpdate(
            {
              child,
              date
            },
            {
              updateOn: new Date(),
              attend
            }
          )
          if (oneDayCheck === null) {
            await attendances.create({
              child,
              date,
              updateOn: null,
              attend
            })

            res.status(201).end()
            return
          } else {
            res.status(204).end()
            return
          }
        } else {
          sendSuccessResponse(res, null)
          return
        }
      } catch (error) {
        console.log(error.message)
        await attendances.findOneAndUpdate(
          {
            child,
            date
          },
          {
            updateOn: new Date(),
            attend
          }
        )
        res.status(204).end()
        return 0
      }
    } else {
      res.status(403).end()
      return 0
    }
  },

  async getInfoAttendanceModal (req, res) {
    try {
      const { date } = req.query
      const { position } = req
      const splitDate = date.split('-')

      const month = parseInt(splitDate[1])
      const year = parseInt(splitDate[0])
      const day = parseInt(splitDate[2])

      let { room } = req.query
      let monthName = ''
      let showDayInModal = ''
      let event = new Date(Date.UTC(year, month - 1, day, 3, 0, 0))

      room = stringToObjectId(room)

      if (position === 'admin' || position === 'teacher') {
        const childInfo = await rooms
          .find({ room, endDate: null })
          .populate('child')
          .sort({ startDate: 'asc' })
        const answer = []
        let selectedDateCheck = null

        event = event.toString().split(' ')
        monthName = convertNameMonth(event[1])
        showDayInModal = convertNameDate(day, monthName, year, event[0])

        for (let i = 0; i < childInfo.length; i++) {
          const attendDate = await attendances.findOne({
            date: date + 'T00:00:00.000+00:00',
            child: childInfo[i].child._id
          })

          if (attendDate !== null) {
            selectedDateCheck = attendDate.attend
          } else {
            selectedDateCheck = null
          }

          answer.push(setInfoAttendanceModal(childInfo[i], i, selectedDateCheck))
        }
        sendSuccessResponse(res, { date, answer, showDayInModal })
      } else {
        res.status(403).end()
        return 0
      }
    } catch (error) {
      res.status(500).end()
    }
  },

  getMonthInfo (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      const { date } = req.query
      const splitDate = date.split('-')

      const month = parseInt(splitDate[1])
      const year = parseInt(splitDate[0])
      const amountDay = findAmountDay(month, year)
      const dayList = []

      for (let i = 1; i <= amountDay; i++) {
        dayList.push({
          _id: uuidv4(),
          Day: i
        })
      }
      sendSuccessResponse(res, { amountDay, dayList })
    } else {
      res.status(403).end()
      return 0
    }
  },

  async showInfoOnAttendanceTable (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { room, date } = req.query
      room = stringToObjectId(room)
      const dateInfo = getConditionMonthValue(date, findAmountDay)
      let dateCompare = 0
      const result = []
      try {
        const childInfo = await rooms
          .find({ room, endDate: null })
          .populate('child')
          .sort({ startDate: 'asc' })

        for (let m = 0; m < childInfo.length; m++) {
          const days = []
          let attendCheck = false

          const attendInMonth = await attendances.find({
            child: childInfo[m].child._id,
            date: {
              $gte: dateInfo.greaterThanDate,
              $lte: dateInfo.lessThanDate
            }
          })
          const attendToday = await attendances.findOne({
            date: date + 'T00:00:00.000+00:00',
            child: childInfo[m].child._id
          })

          for (let n = 1; n <= dateInfo.amountDay; n++) {
            for (let k = 0; k < attendInMonth.length; k++) {
              let day = ''

              if (n < 10) {
                day = '0' + n
              } else {
                day = n
              }

              dateCompare =
                dateInfo.splitDate[0] + '-' + dateInfo.splitDate[1] + '-' + day

              if (
                moment(attendInMonth[k].date).format('YYYY-MM-DD') ===
                dateCompare
              ) {
                days.push({
                  _id: uuidv4(),
                  Day: n,
                  attend: attendInMonth[k].attend
                })

                attendCheck = true
              }
            }
            if (!attendCheck) {
              days.push({
                _id: uuidv4(),
                Day: n,
                attend: null
              })
            }

            attendCheck = false
          }

          if (attendToday === null) {
            result.push(setInfoAttendanceTable(childInfo[m], m, days, null))
          } else {
            result.push(
              setInfoAttendanceTable(childInfo[m], m, days, attendToday.attend)
            )
          }
        }
        sendSuccessResponse(res, result)
      } catch (error) {
        console.log(error.message)
        res.status(500).end()
      }
    } else {
      res.status(403).end()
      return 0
    }
  }
}
