const healths = require('../database/models_v2/health')
const rooms = require('../database/models/enrollment')

const {
  sendErrorResponse,
  sendSuccessResponse
} = require('../helpers/apiResponse')
const { setInfoHealthTable } = require('../helpers/handleArray')
const { stringToObjectId } = require('../database/models/roomType')

module.exports = {
  async handleBreakfast (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, breakfast, date } = req.body

      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          breakfast
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast,
            cloth: null,
            head: null,
            ear: null,
            nail: null,
            skin: null,
            temperature: null,
            wound: null,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลการทานอาหารเช้าเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลการทานอาหารเช้าเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          breakfast
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลการทานอาหารเช้าเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleCloth (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, cloth, date } = req.body
      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          cloth
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast: null,
            cloth,
            head: null,
            ear: null,
            nail: null,
            skin: null,
            temperature: null,
            wound: null,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลการนำเสื้อเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลการนำเสื้อเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          cloth
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลการนำเสื้อเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleHead (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, head, date } = req.body
      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          head
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast: null,
            cloth: null,
            head,
            ear: null,
            nail: null,
            skin: null,
            temperature: null,
            wound: null,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลบริเวณศีรษะเสร็จสิ้น'
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลบริเวณศีรษะเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          head
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลบริเวณศีรษะเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleEar (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, ear, date } = req.body
      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          ear
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast: null,
            cloth: null,
            head: null,
            ear,
            nail: null,
            skin: null,
            temperature: null,
            wound: null,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลบริเวณหูเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลบริเวณหูเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          ear
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลบริเวณหูเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleNail (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, nail, date } = req.body
      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          nail
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast: null,
            cloth: null,
            head: null,
            ear: null,
            nail,
            skin: null,
            temperature: null,
            wound: null,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลบริเวณเล็บเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลบริเวณเล็บเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          nail
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลบริเวณเล็บเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleSkin (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, skin, date } = req.body
      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          skin
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast: null,
            cloth: null,
            head: null,
            ear: null,
            nail: null,
            skin,
            temperature: null,
            wound: null,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลบริเวณผิวหนังเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลผิวหนังเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          skin
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลผิวหนังเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleTemperature (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, temperature, date } = req.body
      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          temperature
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast: null,
            cloth: null,
            head: null,
            ear: null,
            nail: null,
            skin: null,
            temperature,
            wound: null,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลอุณหภูมิร่างกายเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลอุณหภูมิร่างกายเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          temperature
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลอุณหภูมิร่างกายเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleWound (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { child, wound, date } = req.body
      date = date + 'T00:00:00.000Z'

      try {
        const checkHealthInfo = await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          wound
        })

        if (checkHealthInfo === null) {
          await healths.create({
            child,
            breakfast: null,
            cloth: null,
            head: null,
            ear: null,
            nail: null,
            skin: null,
            temperature: null,
            wound,
            date,
            updateOn: null
          })

          res.status(201).json({
            code: 201,
            message: 'เช็คข้อมูลบริเวณหูเสร็จสิ้น',
            data: null
          })
          return
        } else {
          res.status(204).json({
            code: 204,
            message: 'แก้ไขข้อมูลบาดแผลเสร็จสิ้น',
            data: null
          })
          return
        }
      } catch (error) {
        await healths.findOneAndUpdate({
          child,
          date
        }, {
          updateOn: new Date(),
          wound
        })
        res.status(204).json({
          code: 204,
          message: 'แก้ไขข้อมูลบาดแผลเสร็จสิ้น',
          data: null
        })
        return 0
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async showInfoOnHealthTable (req, res) {
    const { position } = req

    if (position === 'admin' || position === 'teacher') {
      let { room, date } = req.query
      const result = []

      room = stringToObjectId(room)

      try {
        const childList = await rooms
          .find({ room, endDate: null })
          .populate('child')
          .sort({ startDate: 'asc' })

        for (let k = 0; k < childList.length; k++) {
          const findHealthInfo = await healths.findOne({
            date: date + 'T00:00:00.000+00:00',
            child: childList[k].child._id
          })

          result.push(setInfoHealthTable(childList[k], k, date, findHealthInfo))
        }

        // console.log(findHealthInfo);
        // console.log(result);
        sendSuccessResponse(res, result)
      } catch (error) {
        console.log(error.message)
        sendErrorResponse(error)
      }
    } else {
      res
        .status(401)
        .json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  }
}
