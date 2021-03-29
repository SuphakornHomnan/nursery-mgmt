const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.get('/showList', verify(), controller.habitController.showList)

router.post('/createList', verify(), controller.habitController.createList)
router.post(
  '/createInfoCategory',
  verify(),
  controller.habitController.createInfoCategory
)
router.post('/infoItem', verify(), controller.habitController.createInfoItem)

module.exports = router
