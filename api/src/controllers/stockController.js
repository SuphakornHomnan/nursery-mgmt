const historyStock = require('../database/models/history_stock')
const showStocks = require('../database/models/show_stock')
const stocks = require('../database/models/stock')

const { v4: uuidv4 } = require('uuid')

const { findAmountDay } = require('../helpers/dateConvert')
const { getColor, sizeColor } = require('../helpers/getColor')
const {
  sendErrorResponse,
  sendSuccessResponse
} = require('../helpers/apiResponse')

module.exports = {
  async addItem (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const { item, size } = req.body

      try {
        const result = await stocks.create({
          item,
          size
        })
        await showStocks.create({
          amount: 0,
          item: result._id
        })
        res.json({ code: 201, message: 'เพิ่มของเสร็จสิ้น', data: null })
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async getAllStocks (req, res) {
    const { position } = req
    if (position === 'accountant' || position === 'admin') {
      try {
        const result = await showStocks.find().populate('item')
        sendSuccessResponse(res, result)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
    }
  },

  async getSelectionStart (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const answer = []
      try {
        const result = await showStocks.find({}).populate('item')
        for (let i = 0; i < result.length; i++) {
          if (
            result[i].item.size === 'S' ||
            result[i].item.size === 'Free Size'
          ) {
            answer.push({
              item: result[i].item._id,
              amount: result[i].amount,
              name: result[i].item.item,
              size: result[i].item.size
            })
          }
        }
        sendSuccessResponse(res, answer)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async getSelection (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const { size } = req.query
      const answer = []

      try {
        const result = await showStocks.find({}).populate('item')

        for (let i = 0; i < result.length; i++) {
          if (result[i].item.size === size.toUpperCase()) {
            answer.push({
              _id: result[i]._id,
              item: result[i].item._id,
              amount: result[i].amount,
              price: result[i].price,
              name: result[i].item.item,
              color: sizeColor(size.toUpperCase())
            })
          }
        }
        sendSuccessResponse(res, answer)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleShow (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const answer = []
      const studentUniformAmount = []
      const dressAmount = []
      const pantAmount = []
      const sleepAmount = []
      const sportAmount = []
      const bibAmount = []
      const bagAmount = []
      const schoolBagAmount = []

      const listStockName = [
        'ชุดนักเรียน', // case 0
        'ชุดเดรส', // case 1
        'กางเกงนักเรียน', // case 2
        'ชุดนอน', // case 3
        'ชุดพละ', // case 4
        'เอี้ยม', // case 5
        'ถุงผ้า', // case 6
        'กระเป๋านักเรียน' // case 7
      ]

      try {
        const result = await showStocks.find({}).populate('item').sort({ item: 1 })

        for (let i = 0; i < result.length; i++) {
          if (result[i].item.item === 'ชุดนักเรียน') {
            studentUniformAmount.push(result[i].amount)
          } else if (result[i].item.item === 'ชุดเดรส') {
            dressAmount.push(result[i].amount)
          } else if (result[i].item.item === 'กางเกงนักเรียน') {
            pantAmount.push(result[i].amount)
          } else if (result[i].item.item === 'ชุดนอน') {
            sleepAmount.push(result[i].amount)
          } else if (result[i].item.item === 'ชุดพละ') {
            sportAmount.push(result[i].amount)
          } else if (result[i].item.item === 'เอี้ยม') {
            bibAmount.push(result[i].amount)
          } else if (result[i].item.item === 'ถุงผ้า') {
            bagAmount.push(result[i].amount)
          } else if (result[i].item.item === 'กระเป๋านักเรียน') {
            schoolBagAmount.push(result[i].amount)
          }
        }

        for (let j = 0; j < listStockName.length; j++) {
          switch (j) {
            case 0:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: studentUniformAmount[0],
                m: studentUniformAmount[1],
                l: studentUniformAmount[2],
                xl: studentUniformAmount[3],
                xxl: studentUniformAmount[4],
                free_size: '-'
              })
              break

            case 1:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: dressAmount[0],
                m: dressAmount[1],
                l: dressAmount[2],
                xl: dressAmount[3],
                xxl: dressAmount[4],
                free_size: '-'
              })
              break

            case 2:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: pantAmount[0],
                m: pantAmount[1],
                l: pantAmount[2],
                xl: pantAmount[3],
                xxl: pantAmount[4],
                free_size: '-'
              })
              break

            case 3:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: sleepAmount[0],
                m: sleepAmount[1],
                l: sleepAmount[2],
                xl: sleepAmount[3],
                xxl: sleepAmount[4],
                free_size: '-'
              })
              break

            case 4:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: sportAmount[0],
                m: sportAmount[1],
                l: sportAmount[2],
                xl: sportAmount[3],
                xxl: sportAmount[4],
                free_size: '-'
              })
              break

            case 5:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: bibAmount[0],
                m: bibAmount[1],
                l: bibAmount[2],
                xl: bibAmount[3],
                xxl: '-',
                free_size: '-'
              })
              break

            case 6:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: '-',
                m: '-',
                l: '-',
                xl: '-',
                xxl: '-',
                free_size: bagAmount[0]
              })
              break

            case 7:
              answer.push({
                _id: uuidv4(),
                name: listStockName[j],
                s: '-',
                m: '-',
                l: '-',
                xl: '-',
                xxl: '-',
                free_size: schoolBagAmount[0]
              })
              break

            default:
              break
          }
        }
        sendSuccessResponse(res, answer)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async getHistory_v1 (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const answer = []

      try {
        const result = await historyStock.find({}).populate('item')
        for (let i = 0; i < result.length; i++) {
          let date = result[i].updateOn.toString()
          date = date.slice(0, 24)
          answer.push({
            name: result[i].item.item,
            size: result[i].item.size,
            amount: result[i].amount,
            date,
            owner: result[i].modify_by
          })
        }

        sendSuccessResponse(res, answer)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async getHistory_v2 (req, res) {
    const { position } = req
    if (position === 'admin' || position === 'accountant') {
      const { date } = req.query
      const answer = []

      const splitDate = date.split('-')
      const ltDate =
        splitDate[0] +
        '-' +
        splitDate[1] +
        '-' +
        findAmountDay(
          parseInt(splitDate[1]),
          parseInt(splitDate[0])
        ).toString() +
        'T00:00:00.000+00:00'
      const gtDate =
        splitDate[0] + '-' + splitDate[1] + '-' + '01' + 'T00:00:00.000+00:00'

      const result = await historyStock
        .find({
          updateOn: {
            $gte: gtDate,
            $lte: ltDate
          }
        })
        .sort({ updateOn: 'desc' })
        .populate('item')

      for (let i = 0; i < result.length; i++) {
        let date = result[i].updateOn.toString()
        let temp = null
        date = date.slice(0, 24)

        if (parseInt(result[i].amount) > 0) {
          temp = '#069903'
        } else {
          temp = '#F90303'
        }
        answer.push({
          _id: uuidv4(),
          name: result[i].item.item,
          size: result[i].item.size,
          color_size: sizeColor(result[i].item.size),
          amount: result[i].amount,
          color_amount: temp,
          date,
          color: getColor(date),
          owner: result[i].modify_by
        })
      }

      sendSuccessResponse(res, answer)
    } else {
      res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
      return 0
    }
  },

  async handleStock (req, res) {
    const { owner, position } = req
    if (position === 'accountant' || position === 'admin') {
      const { item } = req.body
      let { amount } = req.body
      if (parseInt(amount) === 0) {
        res.status(400).end()
        return
      } else if (parseInt(amount) < 0) {
        res.status(400).end()
        return
      }
      let updateAmount = 0

      amount = parseInt(amount)

      try {
        const target = await showStocks.findOne({ item })

        updateAmount = target.amount + amount
        await showStocks.updateOne({ item }, { amount: updateAmount })
        await historyStock.create({
          updateOn: new Date(),
          amount,
          item,
          modify_by: owner
        })
        res.status(201).end()
        return
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.status(401).end()
      return 0
    }
  },

  async decreaseStock (req, res) {
    try {
      const { owner, position } = req
      if (position === 'accountant' || position === 'admin') {
        const { item } = req.body
        const { amount } = req.body
        let updateAmount = 0

        // Check value
        if (parseInt(amount) === 0) {
          res.status(401).end()
          return
        } else if (parseInt(amount) < 0) {
          res.status(400).end()
          return
        }
        // If pass condition => This Value is positive integer
        const target = await showStocks.findOne({ item })
        if (target.amount < parseInt(amount)) {
          res.json({ code: 401, message: 'ของในคลังมีไม่เพียงพอ' })
          return
        } else {
          updateAmount = target.amount - parseInt(amount)
          await showStocks.updateOne({ item }, { amount: updateAmount })
          await historyStock.create({
            updateOn: new Date(),
            amount: `-${amount}`,
            item,
            modify_by: owner
          })
          res.status(201).end()
          return
        }
      } else {
        res.json({ code: 401, message: 'คุณไม่สามารถเข้าหน้านี้ได้', data: null })
        return 0
      }
    } catch (error) {
      sendErrorResponse(res, error)
    }
  },
  async addField (req, res) {
    try {
      const { position } = req
      if (position === 'admin') {
        const result = await showStocks.find({})

        // eslint-disable-next-line array-callback-return
        result.map(data => {
          data.price = 30
          data.save()
        })
        res.end()
      } else {
        res.json({ code: 401, message: 'คุณไม่สามารถเข้าfunctionนี้ได้', data: null })
        return 0
      }
    } catch (error) {
      sendErrorResponse(res, error)
    }
  },
  async editPrice (req, res) {
    try {
      const { position } = req
      if (position === 'admin' || position === 'accountant') {
        const { _id, price } = req.body

        if (parseInt(price) <= 0) {
          res.status(400).end()
          return 0
        }
        await showStocks.findByIdAndUpdate({ _id }, { price })

        res.status(201).end()
      } else {
        res.json({ code: 401, message: 'คุณไม่สามารถเข้าfunctionนี้ได้', data: null })
        return 0
      }
    } catch (error) {
      res.status(400).end()
    }
  },
  async addItemCode (req, res) {
    try {
      const { position } = req
      if (position === 'admin') {
        const result = await stocks.find({})
        // eslint-disable-next-line array-callback-return
        result.map(data => {
          data.itemCode = '001'
          data.save()
        })
        res.end()
      } else {
        res.status(403).send({ message: 'คุณไม่มีสิทธิ์เข้าถึงหน้านี้' })
      }
    } catch (error) {
      res.status(500).end()
    }
  }
}
