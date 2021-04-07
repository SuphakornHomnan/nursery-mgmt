const mongoose = require('mongoose')
const childs = require('../database/models/child')
const childDynamic = require('../database/models/child_dynamic')
const documents = require('../database/models_v2/document')
const guardians = require('../database/models/guardian')
const medicalsV2 = require('../database/models_v2/medical')
const rooms = require('../database/models/enrollment')
const {
  calculateStandardOne,
  calculateStandardTwo,
  calculateStandardThree,
} = require('../database/calulateStandard')
const {
  checkRelation,
  handleChildV2,
  combineList,
} = require('../helpers/handleProfileTwo')
const { setInfoProfileTable } = require('../helpers/handleArray')
const { stringToObjectId } = require('../database/models/roomType')

module.exports = {
  async getStatusButtonDocForm (req, res) {
    try {
      const { position } = req

      if (
        position === 'accountant' ||
        position === 'admin' ||
        position === 'teacher'
      ) {
        const { _id } = req.query
        let status = false

        const result = await documents.findOne({ child: _id })

        if (result === null) {
          // Nothing
        } else {
          // ever register docForm
          status = true
        }
        res.json(status)
      } else {
        res.status(403).end()
        return 0
      }
    } catch (error) {
      console.log(error)
      res.status(500).end()
    }
  },

  async getDetailProfile (req, res) {
    const { position } = req

    if (
      position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher'
    ) {
      let { room } = req.query
      room = stringToObjectId(room)

      try {
        const results = await rooms
          .find({ room, endDate: null })
          .populate('room')
          .sort({ startDate: 'asc' })
        const childInfo = []
        const profileList = []

        for (let k = 0; k < results.length; k++) {
          const childDetail = await childDynamic
            .findOne({ child: results[k].child })
            .populate('child')

          if (childDetail === null) {
            // Nothing
          } else {
            childInfo.push(childDetail)
          }
        }
        for (let m = 0; m < childInfo.length; m++) {
          const weightValue =
            childInfo[m].weight[childInfo[m].weight.length - 1].value

          const heightValue =
            childInfo[m].height[childInfo[m].height.length - 1].value

          const gender = childInfo[m].child.gender

          let yearValue =
            new Date().getFullYear() -
            childInfo[m].child.birth_date.getFullYear()

          let monthValue =
            new Date().getMonth() - childInfo[m].child.birth_date.getMonth()

          if (monthValue < 0) {
            --yearValue
            monthValue += 12
          }

          const standardOne = await calculateStandardOne(
            weightValue,
            gender,
            yearValue,
            monthValue
          )
          const standardTwo = await calculateStandardTwo(
            heightValue,
            gender,
            yearValue,
            monthValue
          )
          const standardThree = await calculateStandardThree(
            weightValue,
            heightValue,
            gender
          )
          console.log(standardOne);
          profileList.push(
            setInfoProfileTable(
              m,
              childInfo[m],
              { yearValue, monthValue, weightValue, heightValue },
              { standardOne, standardTwo, standardThree }
            )
          )
        }

        res.json({
          message: 'success to get profileList',
          data: profileList
        })
      } catch (error) {
        console.log(error)
        res.status(500).end()
      }
    } else {
      res.status(403).end()
      return 0
    }
  },

  async getDetailProfileInfo (req, res) {
    const { position } = req

    if (
      position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher'
    ) {
      const { _id } = req.query

      try {
        const child = await childDynamic
          .findOne({ child: _id })
          .populate('child')

        const custodian = await guardians.find({ child: _id })
        const room = await rooms
          .findOne({ child: _id, endDate: null })
          .populate('room')
        const medical = await medicalsV2.findOne({ child: _id })
        const custodianList = checkRelation(custodian)
        const childList = handleChildV2(child)
        const profileTwo = combineList(childList, custodianList, room, medical)
        res.json({
          message: 'get profile ifo complete',
          data: profileTwo
        })
      } catch (error) {
        console.log(error)
        res.status(500).end()
      }
    } else {
      res.status(403).end()
      return 0
    }
  },

  async updateInfo (req, res) {
    try {
      const { position } = req
      if (
        position === 'admin' ||
        position === 'accountant' ||
        position === 'teacher'
      ) {
        let {
          weight,
          height,
          nickname,
          father_name,
          mother_name,
          father_phone,
          mother_phone,
          hospital,
          url,
          date,
          room,
        } = req.body.objList

        const _id = req.params

        const weightObj = {
          _id: mongoose.Types.ObjectId(),
          value: weight,
          date,
        }

        const heightObj = {
          _id: mongoose.Types.ObjectId(),
          value: height,
          date,
        }

        const childPhoto = {
          _id: mongoose.Types.ObjectId(),
          value: url,
          date,
        }

        const hospitalObj = {
          _id: mongoose.Types.ObjectId(),
          value: hospital,
          date,
        }

        if (room === null || room === undefined || room === '') {
          // Nothing
        } else {
          room = stringToObjectId(room)
          await rooms.updateOne(
            { child: _id, endDate: null },
            { endDate: date }
          )
          await rooms.create({
            child: _id,
            room,
            startDate: date,
            endDate: '',
          })
        }

        if (nickname === null || nickname === undefined || nickname === '') {
          // Nothing
        } else {
          await childs.updateOne({ _id }, { nickname })
        }

        if (weight === null || weight === undefined || weight === '') {
          // Nothing
        } else {
          await childDynamic.updateOne(
            { child: _id },
            { $push: { weight: weightObj } }
          )
        }

        if (height === null || height === undefined || height === '') {
          // Nothing
        } else {
          await childDynamic.updateOne(
            {
              child: _id,
            },
            { $push: { height: heightObj } }
          )
        }
        // child photo
        if (url === null || url === undefined || url === '') {
          // Nothing
        } else {
          await childDynamic.updateOne(
            { child: _id },
            { $push: { photo: childPhoto } }
          )
        }

        if (
          father_name === null ||
          father_name === undefined ||
          father_name === ''
        ) {
          // Nothing
        } else {
          const fatherInfo = await guardians.updateOne(
            { child: _id, relationship: 'father' },
            { name: father_name, telephone: father_phone }
          )
          // Never have father info
          if (fatherInfo.n === 0) {
            await guardians.create({
              child: _id,
              name: father_name,
              telephone: father_phone,
              relationship: 'father',
              occupation: null,
              id_card: null,
              email: null,
              url: null,
              date_sign: null,
            })
          }
        }
        if (
          mother_name === null ||
          mother_name === undefined ||
          mother_name === ''
        ) {
          // Nothing
        } else {
          const motherInfo = await guardians.updateOne(
            { child: _id, relationship: 'mother' },
            { name: mother_name, telephone: mother_phone }
          )
          // Never have mother info
          if (motherInfo.n === 0) {
            await guardians.create({
              child: _id,
              name: mother_name,
              telephone: mother_phone,
              relationship: 'mother',
              occupation: null,
              id_card: null,
              email: null,

              url: null,
              date_sign: null,
            })
          }
        }
        if (hospital === null || hospital === undefined || hospital === '') {
          // Nothing
        } else {
          const hospitalInfo = await medicalsV2.updateOne(
            { child: _id },
            { $push: { hospital: hospitalObj } }
          )
          // Never have hospital info
          if (hospitalInfo.n === 0) {
            await medicalsV2.create({
              child: _id,
              info: [],
              hospital: hospitalObj,
            })
          }
        }
        res.status(204).end()
      } else {
        res.status(403).end()
        return 0
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).end()
    }
  }
}
