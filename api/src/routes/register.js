const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.get('/', verify(), controller.registerController.getChildNotRegister)

router.post('/', verify(), controller.registerController.registerForm_v2)
router.post('/step1', verify(), controller.registerController.regisChild_v2)
router.post('/step2', verify(), controller.registerController.docForm_v2)

module.exports = router
