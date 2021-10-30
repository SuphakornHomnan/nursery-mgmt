module.exports = () => async (req, res, next) => {
  if (req.position === 'admin' || req.position === 'accountant') {
    next()
  }
  return res.status(401).json({ msg: 'Unauthorized' })
}
