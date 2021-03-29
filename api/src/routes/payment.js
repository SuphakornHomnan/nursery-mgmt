const controller = require('../controllers')
const router = require('express').Router()
const verify = require('../middlewares/verifyJWT')

router.get('/slip', verify(), controller.paymentController.getSlip)
router.get('/', verify(), controller.paymentController.getInfoPaymentTable)
router.get('/print/invoice', verify(), controller.paymentController.getInvoiceInfo)
router.get('/print/slip', verify(), controller.paymentController.getSlipInfo)

router.post('/', verify(), controller.paymentController.createTransaction)
router.patch('/', verify(), controller.paymentController.handleTransaction)
// add field
router.patch('/transfer', verify(), controller.paymentController.addField)
router.patch('/expDate', verify(), controller.paymentController.addExpDateField)
router.patch('/amount', verify(), controller.paymentController.addAmountField)

module.exports = router
