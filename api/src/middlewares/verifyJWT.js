const jwt = require('jsonwebtoken')

module.exports = () => async (req, res, next) => {
  try {
    const authorization = req.header('Authorization')

    if (authorization === undefined) {
      res.json({
        code: 401,
        message: 'Must be Authorization header',
        data: null
      })
      return
    }

    const token = authorization.replace('Bearer', '')
    const decoded = jwt.verify(token, 'suphanice_key')
    const user = decoded.user
    // console.log(decoded);
    // console.log(user);
    req.position = user.position
    req.userID = user.userID
    req.owner = user.owner
    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      error.status = 401
    }
    res.json({ code: 400, message: error.message, data: null })
    return 0
  }
}
