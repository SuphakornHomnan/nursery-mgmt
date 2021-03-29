const bcrypt = require('bcrypt')
const nodeMailer = require('nodemailer')
const crypto = require('crypto')

const users = require('../database/models/users')

const genJWT = require('../services/genJWT')
const { sendErrorResponse } = require('../helpers/apiResponse')

module.exports = {
  async login (req, res) {
    try {
      const { email, password } = req.body

      const USER = await users.findOne({ email })

      if (USER === null) {
        res.status(400).end()
        return
      } else {
        bcrypt.compare(password, USER.password, (err, results) => {
          if (results === true) {
            const token = genJWT({
              userID: USER.id,
              position: USER.position,
              owner: USER.owner
            })
            // console.log(token)
            res.json({
              code: 200,
              message: 'Login success',
              data: { token, USER }
            })
          } else {
            console.log(err)
            res.status(400).end()
            return 0
          }
        })
      }
    } catch (error) {
      res.status(500).end()
    }
  },
  async resetPassword (req, res) {
    try {
      const transporter = nodeMailer.createTransport({
        host: 'gmail',
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD
        }
      })

      const buffer = crypto.randomBytes(32)
      const token = buffer.toString('hex')
      const user = await users.findOne({ email: req.body.email })

      user.resetToken = token
      user.expireToken = Date.now() + 3600000
      user.save()

      transporter.sendMail({
        to: user.email,
        from: 'no-replay@nursery.com',
        subject: 'password reset',
        html: `
        <p>You requested for password reset</p>
        <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
        `
      })
      res.json({ message: 'check your email' })
    } catch (error) {
      res.status(500).end()
    }
  },
  async newPassword (req, res) {
    try {
      const newPassword = req.body.password
      const sentToken = req.body.token.token
      const user = await users.findOne({ resetToken: sentToken, expireToken: { $gt: Date.now() } })
      const hashPassword = await bcrypt.hash(newPassword, 12)
      user.password = hashPassword
      user.resetToken = undefined
      user.expireToken = undefined

      user.save()
      res.json({ message: 'password updated success' })
    } catch (error) {
      res.status(500).end()
    }
  }
}
