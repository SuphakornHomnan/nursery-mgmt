/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
const childs = require('../domain/models/child')
const payments = require('../domain/models/payment')
const customers = require('../domain/models/customer')
const stocks = require('../domain/models/stock')
const show_stocks = require('../domain/models/show_stock')
const history_stocks = require('../domain/models/history_stock')
const { getColor, genderColor } = require('../helpers/getColor')
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../helpers/apiResponse')

module.exports = {
  async createTransaction(req, res) {
    const { owner, position } = req
    if (position === 'admin' || position === 'accountant') {
      const {
        child,
        total_price,
        type,
        date,
        expDate,
        amount,
        size,
      } = req.body.obj
      let { topic } = req.body.obj
      // check value in form
      if (
        child === undefined ||
        child === null ||
        child === '' ||
        topic === null ||
        topic === '' ||
        total_price === null ||
        total_price === '' ||
        parseInt(total_price) <= 0 ||
        expDate === null ||
        expDate === undefined
      ) {
        res.status(400).end()
        return
      }
      try {
        // find lastest order num
        const lastest = await payments.findOne({}).sort({ _id: -1 })

        if (type === 'ชุดฟอร์มต่างๆ') {
          const code = topic.split('-')
          const historyAmount = '-' + amount
          let itemId = {}

          if (code[0] === '007' || code[0] === '008') {
            itemId = await stocks.findOne({ itemCode: code[0] })
          } else {
            itemId = await stocks.findOne({ itemCode: code[0], size })
          }

          // เลือกไซต์ที่ไม่มีในของชิ้นนั้น
          if (!itemId) {
            res.status(400).end()
            return 0
          }

          // sell item in stock
          const result = await show_stocks.findOne({ item: itemId._id })
          const finalAmount = result.amount - parseInt(amount)
          // check amount item in stock
          if (finalAmount < 0) {
            res.status(400).end()
            return
          }
          result.amount = finalAmount
          result.save()
          // create history stock
          await history_stocks.create({
            updateOn: new Date(),
            amount: historyAmount,
            item: itemId._id,
            modify_by: owner,
          })
          topic = topic + ` ${size}`
        }
        await payments.create({
          child,
          start_date: date,
          expDate,
          updateOn: new Date(),
          type,
          topic,
          total_price,
          outstanding_balance: total_price,
          slipNo: lastest.slipNo + 1,
          invoiceNum: lastest.invoiceNum + 1,
          status: 'ค้างชำระ',
          amount,
        })
        res.status(201).end()
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res.status(403).end()
      return 0
    }
  },

  async getInfoPaymentTable (req, res) {
    try {
      const { position } = req

      if (position === 'admin' || position === 'accountant') {
        const result = []
        const { status } = req.query

        const paymentInfo = await payments
          .find({ status })
          .sort({ invoiceNum: 'asc' })

        for (let i = 0; i < paymentInfo.length; i++) {
          const child = await childs
            .findOne({ _id: paymentInfo[i].child })
            .populate('child')

          let date = paymentInfo[i].updateOn.toString()
          date = date.slice(0, 24)

          if (paymentInfo.length > 0) {
            result.push({
              no: i + 1,
              _id: child._id,
              amount: paymentInfo[i].amount,
              name: `${child.firstname} ${child.middlename} ${child.lastname}`,
              nickname: child.nickname,
              color_name: genderColor(child.gender),
              payment_id: paymentInfo[i]._id,
              topic: paymentInfo[i].topic,
              type: paymentInfo[i].type,
              total_price: paymentInfo[i].total_price,
              outstanding_balance: paymentInfo[i].outstanding_balance,
              status: paymentInfo[i].status,
              slipNo: paymentInfo[i].slipNo,
              invoiceNum: paymentInfo[i].invoiceNum,
              updateOn: date,
              date_color: getColor(date),
            })
          }
        }
        sendSuccessResponse(res, result)
      } else {
        res.status(403).end()
        return 0
      }
    } catch (error) {
      res.status(500).end()
    }
  },

  async getSlip (req, res) {
    const { position } = req

    if (
      position === 'admin' ||
      position === 'accountant' ||
      position === 'teacher'
    ) {
      const { child } = req.query
      try {
        const result = []
        const slipInfo = await payments.find({ child })
        for (let i = 0; i < slipInfo.length; i++) {
          if (slipInfo[i].slip.length > 0) result.push(...slipInfo[i].slip)
        }

        sendSuccessResponse(res, result)
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res.status(403).end()
      return 0
    }
  },

  async handleTransaction (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const { slip, payment_id } = req.body.obj
      const { outstanding_balance } = req.body.obj
      if (slip === null || outstanding_balance === undefined) {
        res.status(400).end()
        return
      }
      try {
        const oldInfo = await payments.findOne({ _id: payment_id })
        const updatePrice =
          oldInfo.outstanding_balance - parseInt(outstanding_balance)
        if (updatePrice > 0) {
          await payments.findOneAndUpdate(
            { _id: payment_id },
            {
              outstanding_balance: updatePrice,
              updateOn: new Date(),
              $push: { slip }
            }
          )
        } else if (updatePrice === 0) {
          await payments.findOneAndUpdate(
            { _id: payment_id },
            {
              outstanding_balance: updatePrice,
              status: 'ชำระแล้ว',
              updateOn: new Date(),
              $push: { slip }
            }
          )
        } else if (updatePrice < 0) {
          res.status(400).end()
          return
        }
        res.status(204).end()
      } catch (error) {
        res.status(500).end()
      }
    } else {
      res.status(403).end()
      return 0
    }
  },

  async addField (req, res) {
    try {
      const { position } = req
      if (position === 'admin') {
        const result = await payments.find({})
        // eslint-disable-next-line array-callback-return
        result.map((data) => {
          data.slipNo = null
          data.invoiceNum = null
          data.save()
        })

        res.end()
      } else {
        res
          .status(401)
          .json({
            code: 401,
            message: 'คุณไม่สามารถเข้าหน้านี้ได้',
            data: null,
          })
        return 0
      }
    } catch (error) {
      sendErrorResponse(res, error)
    }
  },

  async getInvoiceInfo(req, res) {
    try {
      const { position } = req
      if (position === 'admin' || position === 'accountant') {
        const { paymentId } = req.query
        let prefixName = null
        const info = await payments
          .findById({ _id: paymentId })
          .populate('child')

        if (info.child.gender === 1) {
          prefixName = 'เด็กชาย'
        } else {
          // eslint-disable-next-line no-unused-vars
          prefixName = 'เด็กหญิง'
        }
        sendSuccessResponse(res, {
          amount: info.amount,
          name: `${prefixName} ${info.child.firstname} ${info.child.middlename} ${info.child.lastname}`,
          nickname: info.child.nickname,
          topic: info.topic,
          totalPrice: info.total_price,
          invoice: info.invoiceNum,
          startDate: info.start_date,
          expDate: info.expDate,
        })
      } else {
        res.status(403).send({ message: 'คุณไม่มีสิทธฺืเข้าถึงบริการนี้' })
        return 0
      }
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
  async getSlipInfo(req, res) {
    try {
      const { position } = req
      if (position === 'admin' || position === 'accountant') {
        const { paymentId } = req.query
        let prefixName = null
        const info = await payments.findById({ _id: paymentId })
        const childInfo = await customers
          .findOne({ child: info.child })
          .populate('child')

        if (childInfo.child.gender === 1) {
          prefixName = 'เด็กชาย'
        } else {
          // eslint-disable-next-line no-unused-vars
          prefixName = 'เด็กหญิง'
        }
        sendSuccessResponse(res, {
          amount: info.amount,
          name: `${prefixName} ${childInfo.child.firstname} ${childInfo.child.middlename} ${childInfo.child.lastname}`,
          nickname: childInfo.child.nickname,
          totalPrice: info.total_price,
          topic: info.topic,
          invoice: info.invoiceNum,
          slipNum: info.slipNo,
          customerId: childInfo._id,
          startDate: info.start_date,
          expDate: info.expDate,
        })
      } else {
        res.status(403).send({ message: 'คุณไม่มีสิทธฺืเข้าถึงบริการนี้' })
        return 0
      }
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },

  async addExpDateField(req, res) {
    try {
      const { position } = req
      if (position === 'admin') {
        const result = await payments.find({})
        result.map((data) => {
          data.expDate = '2021-04-01T00:00:00.000+00:00'
          data.save()
        })
        res.end()
      } else {
        res.status(403).send({ message: 'คุณไม่มีสิทธฺืเข้าถึงบริการนี้' })
        return 0
      }
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
  async addAmountField(req, res) {
    try {
      const { position } = req
      if (position === 'admin') {
        const paymentList = await payments.find({})
        paymentList.map((data) => {
          data.amount = 1
          data.save()
        })
        res.send('add amount field complete')
      } else {
        res.status(403).send({ message: 'คุณไม่มีสิทธฺืเข้าถึงบริการนี้' })
        return 0
      }
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  },
}
