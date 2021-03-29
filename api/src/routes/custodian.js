const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.patch(
  '/name/father',
  verify(),
  controller.custodianController.updateFatherName
)
router.patch(
  '/phone/father',
  verify(),
  controller.custodianController.updateFatherPhone
)
router.patch(
  '/name/mother',
  verify(),
  controller.custodianController.updateMotherName
)
router.patch(
  '/phone/mother',
  verify(),
  controller.custodianController.updateMotherPhone
)
module.exports = router
