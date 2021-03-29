const infoCategory = require('../database/models/info_category')
const infoItem = require('../database/models/info_item')

const {
  sendErrorResponse
} = require('../helpers/apiResponse')

module.exports = {
  async createList (req, res) {},

  async showList (req, res) {},

  async createInfoCategory (req, res) {
    const { name } = req.body
    const { position } = req
    if (position === 'admin') {
      try {
        const result = await infoCategory.create({
          name
        })
        res.json(result)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ message: 'ไม่มีสิทธิ์เข้าถึงนะบ่าผี' })
      return 0
    }
  },

  async createInfoItem (req, res) {
    const { name, category } = req.body
    const { position } = req
    if (position === 'admin') {
      try {
        const result = await infoItem.create({
          name,
          category
        })
        res.json(result)
      } catch (error) {
        sendErrorResponse(res, error)
      }
    } else {
      res.json({ message: 'ไม่มีสิทธิ์เข้าถึงนะบ่าผี' })
      return 0
    }
  }

}
