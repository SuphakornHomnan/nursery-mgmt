const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.get('/', verify(), controller.gadgetController.showChild_v2)

router.post('/checkStuff', verify(), controller.gadgetController.checkList)
router.post('/milk', verify(), controller.gadgetController.handleMilk)
router.post('/pamper', verify(), controller.gadgetController.handlePamper)
router.post('/bottle', verify(), controller.gadgetController.handleBottle)
router.post(
  '/milk_bottle',
  verify(),
  controller.gadgetController.handleMilkBottle
)
router.post('/towel', verify(), controller.gadgetController.handleTowel)

module.exports = router
