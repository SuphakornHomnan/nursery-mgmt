const controllers = require('../controllers')

const router = require('express').Router()

router.post('/', controllers.authController.login)
router.post('/reset', controllers.authController.resetPassword)
router.post('/new-password', controllers.authController.newPassword)

module.exports = router
