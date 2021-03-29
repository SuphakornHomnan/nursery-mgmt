const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.get('/showList', verify(), controller.addressController.getAddressInfo)
router.post(
  '/createList',
  verify(),
  controller.addressController.createAddressInfo
)

module.exports = router
