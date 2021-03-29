const express = require('express')

const controllers = require('../controllers')
const router = express.Router()

const verify = require('../middlewares/verifyJWT')

/* GET users listing. */
router.get('/hi', (req, res, next) => {
  res.send('respond with a resource')
})
router.get('/', verify(), controllers.userController.getDetailUser)
router.get('/my', verify(), controllers.userController.getRole)

router.post('/', verify(), controllers.userController.addUser)
module.exports = router
