const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.post('/enrollRoom/', verify(), controller.roomsController.enrollRoom)
router.post('/createRoom', verify(), controller.roomsController.createRoom)

router.put('/quitRoom', verify(), controller.roomsController.quitRoom)
router.patch('/', verify(), controller.roomsController.updateRoom)

module.exports = router
