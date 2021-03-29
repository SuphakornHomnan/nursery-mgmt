exports.sendSuccessResponse = (res, data, status = 200) => {
  return res.json({
    code: status,
    message: 'complete',
    data
  })
}

exports.sendErrorResponse = (res, error, status = 500) => {
  console.log(res)
  if (error) {
    return res.json({
      code: status,
      message: error.message,
      data: null
    })
  }
  return res.json({
    code: status,
    message: error,
    data: null
  })
}

exports.apiError = (res, message, status = 500) => {
  const error = new Error(message)
  error.code = status
  return res.json({
    code: status,
    message: error.message,
    data: null
  })
}
