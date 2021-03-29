const controller = require('../controllers')
const router = require('express').Router()
const verify = require('../middlewares/verifyJWT')

router.get(
  '/',
  verify(),
  controller.profileController.getDetailProfile
)
router.get(
  '/info',
  verify(),
  controller.profileController.getDetailProfileInfo
)
router.get(
  '/doc/status',
  verify(),
  controller.profileController.getStatusButtonDocForm
)
router.patch(
  '/info/:_id',
  verify(),
  controller.profileController.updateInfo
)

module.exports = router
