const bcrypt = require('bcrypt')
const users = require('../database/models/users')

const {
  sendSuccessResponse,
  sendErrorResponse
} = require('../helpers/apiResponse')
const saltRounds = 10

module.exports = {
  async getDetailUser (req, res) {
    const { userID, position } = req
    console.log(userID)
    console.log(position)
    try {
      const data = await users.findById(userID).select('-password')
      sendSuccessResponse(res, data)
    } catch (error) {
      sendErrorResponse(res, error)
    }
  },
  async getRole (req, res) {
    const { position, userID } = req
    res.json({
      code: 200,
      message: 'get role user complete',
      data: { position, userID }
    })
  },

  async addUser (req, res) {
    const { email, password, role, owner } = req.body
    const { position } = req
    // users.create(req.body);
    // res.end();
    if (position === 'admin') {
      if (email === null || password === null || role === null || owner === null) {
        res.status(400).end()
        return
      }
      // console.log(req.body)
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
          console.log(err)
        }

        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) {
            console.log(err)
          }

          try {
            const results = await users.create({
              email,
              password: hash,
              position: role,
              owner
            })
            // console.log(results)
            res.status(201).end()
          } catch (error) {
            res.status(500).end()
          }
        })
      })
    } else {
      res.status(403).end()
      return 0
    }
  }
}
