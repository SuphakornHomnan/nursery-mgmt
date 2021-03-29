const controller = require('../controllers')
const router = require('express').Router()
const verify = require('../middlewares/verifyJWT')

router.get(
  '/changeMonth',
  verify(),
  controller.attendanceController.getInfoAttendanceModal
)
router.get(
  '/listDate',
  verify(),
  controller.attendanceController.getMonthInfo
)
router.get(
  '/getChild',
  verify(),
  controller.attendanceController.showInfoOnAttendanceTable
)
router.post('/', verify(), controller.attendanceController.checkAttendance)

module.exports = router
