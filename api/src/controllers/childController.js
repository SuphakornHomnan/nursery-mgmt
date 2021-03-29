const mongoose = require('mongoose')

const rooms = require('../database/models/enrollment')
const childs = require('../database/models/child')
const childStatic = require('../database/models/childStatic')
const childDynamic = require('../database/models/child_dynamic')
const customers = require('../database/models/customer')
const { calculateStandardOne, calculateStandardTwo, calculateStandardThree } = require('../database/calulateStandard')
const {
  sendSuccessResponse,
  sendErrorResponse
} = require('../helpers/apiResponse')
const { stringToObjectId } = require('../database/models/roomType')

module.exports = {
  async addCustomerId (req, res) {
    try {
      const { position } = req
      if (position === 'admin' || position === 'accountant') {
        const { customerId, child } = req.body
        const everHave = await customers.findOne({ child })
        // console.log(!everHave)
        if (!everHave) {
          await customers.create({
            _id: customerId,
            child,
            createdAt: new Date()
          })
          res.status(201).json({ message: 'สร้างรหัสลูกค้าคนนี้เสร็จสิ้น' })
        } else {
          res.json({ message: 'สร้างรหัสลูกค้าคนนี้ไปแล้ว ' })
        }
      } else {
        res.status(403).send({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
        return 0
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: error.message })
    }
  },

  async updateDetail (req, res) {
    const { id, weight, height, nickname, date, type } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      try {
        if (type === 'nickname') {
          const result = await childs.findByIdAndUpdate(id, {
            $set: { nickname }
          })
          sendSuccessResponse(res, result)
        }
        if (type === 'body') {
          const child = await childDynamic.findOne({ child: id })
          const genId = mongoose.Types.ObjectId()
          console.log('ObjectId: ', genId)
          const result = {
            id: genId,
            weight,
            height,
            date
          }
          child.child_body.unshift(result)
          await child.save()
          sendSuccessResponse(res, result, 201)
        } else {
          res.json({ success: false, message: 'มึงส่ง type มาให้ถูกดิ ' })
          return
        }
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  },

  async createList (req, res) {
    const { position } = req
    const {
      firstname,
      middlename,
      lastname,
      gender,
      nickname,
      birth_date,
      race,
      nationality,
      religion,
      number_of_siblings,
      child_number,
      application_date,
      history_accident,
      immunization_record,
      child_body,
      child_photo,
    } = req.body
    if (position === 'admin' || position === 'accountant') {
      try {
        const temp = await childs.create({
          firstname,
          middlename,
          lastname,
          gender,
          nickname,
          birth_date
        })
        const id = temp._id
        await childStatic.create({
          child: id,
          race,
          nationality,
          religion,
          number_of_siblings,
          child_number,
          application_date
        })
        await childDynamic.create({
          child: id,
          history_accident,
          immunization_record,
          child_body,
          child_photo
        })
        res.json({ success: true, message: 'เก็บข้อมูลส่วนตัวเด็กเรียบร้อย' })
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
    }
  },

  async getDetailProfile (req, res, next) {
    let { room } = req.query
    const { position } = req
    // console.log(req.query);
    room = stringToObjectId(room)
    if (position === 'admin' || position === 'accountant') {
      try {
        const results = await rooms
          .find({ room, endDate: null })
          .populate('room')
        const childDynamic = []
        const standardOne = []
        const colorOne = []
        const standardTwo = []
        const colorTwo = []
        const standardThree = []
        const colorThree = []
        const year = []
        const month = []
        const weight = []
        const height = []
        for (let k = 0; k < results.length; k++) {
          const temp = await childDynamic
            .findOne({ child: results[k].child })
            .populate('child')

          childDynamic.push(temp)
        }
        for (let m = 0; m < childDynamic.length; m++) {
          const weightValue = childDynamic[m].child_body[0].weight
          const heighValue = childDynamic[m].child_body[0].height
          const gender = childDynamic[m].child.gender
          const yearTemp =
              new Date().getFullYear() -
              childDynamic[m].child.birth_date.getFullYear()
          const monthTemp =
              new Date().getMonth() -
              childDynamic[m].child.birth_date.getMonth()
          const temp = await calculateStandardOne(
            weightValue,
            gender,
            yearTemp,
            monthTemp
          )
          const temp2 = await calculateStandardTwo(
            heighValue,
            gender,
            yearTemp,
            monthTemp
          )
          const temp3 = await calculateStandardThree(
            weightValue,
            heighValue,
            gender
          )
          standardOne[m] = temp.list
          standardTwo[m] = temp2.list
          standardThree[m] = temp3.list
          colorOne[m] = temp.color
          colorTwo[m] = temp2.color
          colorThree[m] = temp3.color
          year[m] = yearTemp
          month[m] = monthTemp
          weight[m] = weightValue
          height[m] = heighValue
        }
        const data = {
          childDynamic,
          standardOne,
          standardTwo,
          standardThree,
          year,
          month,
          weight,
          height,
          colorOne,
          colorTwo,
          colorThree
        }
        res.json(data)
      } catch (error) {
        console.log(error)
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ status: false, message: 'คุณไม่สามารถเข้าหน้านี้ได้' })
      return 0
    }
  },

  async updateWeight (req, res) {
    const { _id, weight } = req.body
    const { position } = req
    // console.log(_id)
    const weightValue = {
      value: weight,
      date: new Date()
    }
    if (position === 'admin' || position === 'accountant') {
      try {
        const result = await childDynamic.updateOne(
          { child: _id },
          { $push: { weight: weightValue } }
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

  async updateHeight (req, res, next) {
    const { _id, height } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      // console.log(_id)
      const heightValue = {
        value: height,
        date: new Date()
      }
      try {
        const result = await childDynamic.updateOne(
          { child: _id },
          { $push: { height: heightValue } }
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

  async updatePhoto (req, res) {
    const { _id, photo } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      // console.log(_id)
      const photoInfo = {
        value: photo,
        date: new Date()
      }
      try {
        const result = await childDynamic.updateOne(
          { child: _id },
          { $push: { photo: photoInfo } }
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

  async updateNickname (req, res) {
    const { _id, nickname } = req.body
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      // console.log(_id)
      try {
        const result = await childs.findByIdAndUpdate({ _id }, { nickname })
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
