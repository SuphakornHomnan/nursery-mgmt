const age = require('./docs/age.json')
const ht = require('./docs/ht.json')

const { standardInfo, weightHeightInfo } = require('../helpers/dateConvert')

exports.calculateStandardOne = async (weight, gender, year, month) => {
  let standard = ''
  console.log(gender);
  console.log(weight);
  console.log(year);
  console.log(month);
  if (weight === 0 || weight === null) {
    return standard
  } else {
    let code = gender.toString() + (year * 12 + month).toString()
    code = parseInt(code)
    // console.log(weight)
    const result = age.find((element) => element.code === code)
    // console.log(result)
    const median = result.median_wt
    const sd = result.sd_wt
    standard = standardInfo('standard_one', weight, sd, median)
    return standard
  }
}

exports.calculateStandardTwo = async (height, gender, year, month) => {
  let standard = ''
  if (height === 0 || height === null) {
    return standard
  } else {
    let code = gender.toString() + (year * 12 + month).toString()
    code = parseInt(code)
    const result = age.find((element) => element.code === code)
    const median = result.median_ht
    const sd = result.sd_ht
    standard = standardInfo('standard_two', height, sd, median)
    return standard
  }
}

exports.calculateStandardThree = async (weight, height, gender) => {
  let standard = ''
  // console.log(`${weight}  ${height}  ${gender}`)

  if (
    weight === 0 ||
    height === 0 ||
    weight === undefined ||
    height === undefined ||
    weight === null ||
    height === null
  ) {
    return standard
  } else {
    let code = gender.toString() + height.toString()
    code = parseInt(code)
    if (code < 150) {
      return standard
    }
    const result = ht.find((element) => element.code === code)
    // console.log(result)
    if (result === undefined) {
      return standard
    }
    // console.log(weight);
    // console.log(height);
    // console.log(gender);
    const median = result.median
    const sd = result.sd
    standard = weightHeightInfo(weight, sd, median)
    // console.log(standard);
    return standard
  }
}
