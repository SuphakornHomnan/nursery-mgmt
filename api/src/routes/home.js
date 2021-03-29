const controller = require('../controllers')
const router = require('express').Router()
const verify = require('../middlewares/verifyJWT')

router.get('/search', verify(), controller.homeController.searchName)
router.get('/attend', verify(), controller.homeController.getAttendChartInfo)
router.get('/check', verify(), controller.homeController.getCheckInfo)
router.get('/gadget', verify(), controller.homeController.getGadgetInfo)
router.get('/health', verify(), controller.homeController.getHealthInfo)
router.get('/room', verify(), controller.homeController.getQuitChildInfo)
router.get('/amountChild', verify(), controller.homeController.getAllAmount)

module.exports = router
