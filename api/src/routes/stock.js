const controller = require('../controllers')

const router = require('express').Router()

const verify = require('../middlewares/verifyJWT')

router.get('/all', verify(), controller.stockController.getAllStocks)
router.get('/start', verify(), controller.stockController.getSelectionStart)
router.get('/select', verify(), controller.stockController.getSelection)
router.get('/', verify(), controller.stockController.handleShow)
router.get('/history', verify(), controller.stockController.getHistory_v1)
router.get('/v2/history', verify(), controller.stockController.getHistory_v2)

router.post('/', verify(), controller.stockController.addItem)

router.patch('/item', verify(), controller.stockController.handleStock)
router.patch('/item/decrease', verify(), controller.stockController.decreaseStock)
router.patch('/addPriceField', verify(), controller.stockController.addField)
router.patch('/price', verify(), controller.stockController.editPrice)
router.patch('/itemCode', verify(), controller.stockController.addItemCode)
module.exports = router
