const mongoose = require('mongoose')

const childSchema = new mongoose.Schema({
  firstname: String,
  middlename: String,
  lastname: String,
  gender: Number,
  nickname: String,
  birth_date: Date
})
// Set index for firstname lastname nickname attribute
childSchema.index({
  firstname: 'text',
  lastname: 'text',
  nickname: 'text'
})

module.exports = mongoose.model('childs', childSchema)
