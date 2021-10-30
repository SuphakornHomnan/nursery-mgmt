const express = require('express')
const router = express.Router()

router.use('/address', require('../address/controller/address.controller'))
router.use('/auth', require('./auth'))
router.use('/stock', require('./stock'))
router.use('/user', require('./users'))
router.use('/child', require('./child'))
router.use('/attendance', require('./attendance'))
router.use('/gadget', require('./gadget'))
router.use('/health', require('./health'))
router.use('/home', require('./home'))
router.use('/custodian', require('./custodian'))
router.use('/room', require('./rooms'))
router.use('/medical', require('./medical'))
router.use('/document', require('./document'))
router.use('/habit', require('./habit'))
router.use('/profile', require('./profile'))
router.use('/payment', require('./payment'))
router.use('/register', require('./register'))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send('Hi everyone!!!!!')
})

module.exports = router
