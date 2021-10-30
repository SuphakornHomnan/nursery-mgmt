const accessAdminAccoutant = require('../../middlewares/access.admin.accoutant')
const verifyJWT = require('../../middlewares/verifyJWT')
const { createAddress } = require('../services/create.address')
const { getAddress } = require('../services/get.address')
const router = require('express').Router()

router.get(
  '/showList',
  verifyJWT(),
  accessAdminAccoutant(),
  getAddress
)
router.post(
  '/',
  // verifyJWT(),
  // accessAdminAccoutant(),
  createAddress
)

module.exports = router
