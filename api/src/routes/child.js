const controllers = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.post('/createList/', verify(), controllers.childController.createList)
router.post('/customer', verify(), controllers.childController.addCustomerId)
router.put(
  '/updateProfile/',
  verify(),
  controllers.childController.updateDetail
)
router.patch('/weight', verify(), controllers.childController.updateWeight)
router.patch('/height', verify(), controllers.childController.updateHeight)
router.patch('/photo', verify(), controllers.childController.updatePhoto)
router.patch('/nickname', verify(), controllers.childController.updateNickname)

module.exports = router
