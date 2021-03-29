const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.get('/', verify(), controller.healthController.showInfoOnHealthTable)

router.post('/breakfast', verify(), controller.healthController.handleBreakfast)
router.post('/cloth', verify(), controller.healthController.handleCloth)
router.post('/ear', verify(), controller.healthController.handleEar)
router.post('/head', verify(), controller.healthController.handleHead)
router.post('/nail', verify(), controller.healthController.handleNail)
router.post('/skin', verify(), controller.healthController.handleSkin)
router.post(
  '/temperature',
  verify(),
  controller.healthController.handleTemperature
)
router.post('/wound', verify(), controller.healthController.handleWound)

module.exports = router
