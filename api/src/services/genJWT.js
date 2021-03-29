const jwt = require('jsonwebtoken')

const genJWT = (user) => {
  return jwt.sign(
    {
      user
    },
    'suphanice_key',
    {}
  )
}

module.exports = genJWT
