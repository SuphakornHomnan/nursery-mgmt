const gadgets = require('../domain/models/gadget')
const gadgetsV2 = require('../domain/models_v2/gadget')
const rooms = require('../domain/models/enrollment')

const { genderColor } = require('../helpers/getColor')
const {
  sendSuccessResponse
} = require('../helpers/apiResponse')
const { stringToObjectId } = require('../domain/models/roomType')

module.exports = {
  async showChild_v2 (req, res) {
    let { room, date } = req.query
    const { position } = req
    if (position === 'admin' || position === 'teacher') {
      const gadgetList = []
      room = stringToObjectId(room)

      try {
        const findChildRoom = await rooms
          .find({ room, endDate: null })
          .populate('child')
          .sort({ startDate: 'asc' })

        for (let k = 0; k < findChildRoom.length; k++) {
          const findGadgetDate = await gadgetsV2.findOne({
            date: date + 'T00:00:00.000+00:00',
            child: findChildRoom[k].child._id
          })

          if (findGadgetDate === null) {
            gadgetList.push({
              _id: findChildRoom[k].child._id,
              no: k + 1,
              name:
                findChildRoom[k].child.firstname +
                ' ' +
                findChildRoom[k].child.middlename +
                ' ' +
                findChildRoom[k].child.lastname,
              nickname: findChildRoom[k].child.nickname,
              color: genderColor(findChildRoom[k].child.gender),
              date,
              milk: null,
              pampers: null,
              waterbottle: null,
              milkbottle: null,
              towel: null
              // checkList: [null, null, null, null, null],
            })
          } else {
            gadgetList.push({
              _id: findChildRoom[k].child._id,
              no: k + 1,
              name:
                findChildRoom[k].child.firstname +
                ' ' +
                findChildRoom[k].child.middlename +
                ' ' +
                findChildRoom[k].child.lastname,
              nickname: findChildRoom[k].child.nickname,
              color: genderColor(findChildRoom[k].child.gender),
              date,
              milk: findGadgetDate.milk,
              pampers: findGadgetDate.pamper,
              waterbottle: findGadgetDate.bottle,
              milkbottle: findGadgetDate.milk_bottle,
              towel: findGadgetDate.towel
            })
          }
        }

        sendSuccessResponse(res, gadgetList)
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },

  async checkList (req, res) {
    const checkList = req.body.list
    const { position } = req
    if (position === 'admin' || position === 'teacher') {
      try {
        for (let i = 0; i < checkList.length; i++) {
          if (checkList[i] !== null) {
            const check = await gadgets.findOne({
              child: checkList[i]._id,
              date: checkList[i].date + 'T00:00:00.000Z'
            })
            if (check === null) {
              console.log('create')
              await gadgets.create({
                child: checkList[i]._id,
                date: checkList[i].date,
                updateOn: null,
                checkList: checkList[i].checkList
              })
            } else {
              const _id = check._id
              console.log('update')
              await gadgets.findByIdAndUpdate(
                {
                  _id
                },
                {
                  date: checkList[i].date,
                  updateOn: new Date(),
                  checkList: checkList[i].checkList
                }
              )
            }
          }
        }
        res.end()
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },
  async handleMilk (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'teacher') {
      const { child, milk } = req.body
      let { date } = req.body
      date = date + 'T00:00:00.000+00:00'
      try {
        const check = await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          milk
        })
        if (check === null) {
          await gadgetsV2.create({
            child,
            date,
            updateOn: null,
            milk,
            pamper: null,
            bottle: null,
            milk_bottle: null,
            towel: null
          })
          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลการเอานมเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลการเอานมเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        console.log(error.message)
        await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          milk
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลการเอานมเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },
  async handlePamper (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'teacher') {
      const { child, pamper } = req.body
      let { date } = req.body
      date = date + 'T00:00:00.000+00:00'
      try {
        const check = await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          pamper
        })
        if (check === null) {
          await gadgetsV2.create({
            child,
            date,
            updateOn: null,
            milk: null,
            pamper,
            bottle: null,
            milk_bottle: null,
            towel: null
          })
          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลการเอาแพมเพิสเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลการเอาแพมเพิสเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        console.log(error.message)
        await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          pamper
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลการเอาแพมเพิสเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },
  async handleBottle (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'teacher') {
      const { child, bottle } = req.body
      let { date } = req.body
      date = date + 'T00:00:00.000+00:00'
      try {
        const check = await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          bottle
        })
        if (check === null) {
          await gadgetsV2.create({
            child,
            date,
            updateOn: null,
            milk: null,
            pamper: null,
            bottle,
            milk_bottle: null,
            towel: null
          })
          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลการเอาขวดเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลการเอาขวดเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          bottle
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลการเอาขวดเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },
  async handleMilkBottle (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'teacher') {
      const { child, milk_bottle } = req.body
      let { date } = req.body
      date = date + 'T00:00:00.000+00:00'
      try {
        const check = await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          milk_bottle
        })
        if (check === null) {
          await gadgetsV2.create({
            child,
            date,
            updateOn: null,
            milk: null,
            pamper: null,
            bottle: null,
            milk_bottle,
            towel: null
          })
          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลการเอาขวดนมเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลการเอาขวดนมเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          milk_bottle
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลการเอาขวดนมเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  },
  async handleTowel (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'teacher') {
      const { child, towel } = req.body
      let { date } = req.body
      date = date + 'T00:00:00.000+00:00'
      try {
        const check = await gadgetsV2.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          towel
        })
        if (check === null) {
          await gadgetsV2.create({
            child,
            date,
            updateOn: null,
            milk: null,
            pamper: null,
            bottle: null,
            milk_bottle: null,
            towel
          })
          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลการเอาผ้าขนหนูเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลการเอาผ้าขนหนูเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await gadgetsV2.findByIdAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          towel
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลการเอาผ้าขนหนูเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(403).end()
      return 0
    }
  }

}
