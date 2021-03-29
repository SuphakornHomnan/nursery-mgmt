const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  position: String,
  owner: String,
  resetToken: String,
  expireToken: Date
}).index({
  email: 1
}, { unique: true })

module.exports = mongoose.model('users', userSchema)
