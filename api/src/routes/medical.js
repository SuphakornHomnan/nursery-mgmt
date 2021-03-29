const controller = require('../controllers')
const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.get(
  '/showHospital',
  verify(),
  controller.medicalController.getHospitalName
)
router.get(
  '/show/totalList',
  verify(),
  controller.medicalController.getAllDetail
)

router.post('/createList', verify(), controller.medicalController.createList)

router.put('/updateList', verify(), controller.medicalController.updateList)
router.patch('/hospital', verify(), controller.medicalController.updateHospital)

module.exports = router
