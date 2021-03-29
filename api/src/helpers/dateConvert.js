exports.convertNameMonth = (month) => {
  switch (month) {
    case 'Jan':
      return 'January'

    case 'Feb':
      return 'February'

    case 'Mar':
      return 'March'

    case 'Apr':
      return 'April'

    case 'May':
      return 'May'

    case 'Jun':
      return 'June'

    case 'Jul':
      return 'July'

    case 'Aug':
      return 'August'

    case 'Sep':
      return 'September'

    case 'Oct':
      return 'October'

    case 'Nov':
      return 'November'

    case 'Dec':
      return 'December'

    default:
      return 0
  }
}

exports.convertNameDate = (day, month, year, dayType) => {
  switch (dayType) {
    case 'Sun':
      return `Sunday ${day} ${month} ${year}`

    case 'Mon':
      return `Monday ${day} ${month} ${year}`

    case 'Tue':
      return `Tuesday ${day} ${month} ${year}`

    case 'Wed':
      return `Wednesday ${day} ${month} ${year}`

    case 'Thu':
      return `Thursday ${day} ${month} ${year}`

    case 'Fri':
      return `Friday ${day} ${month} ${year}`

    case 'Sat':
      return `Saturday ${day} ${month} ${year}`

    default:
      return 0
  }
}

exports.findAmountDay = (month, year) => {
  if (
    month === 1 ||
    month === 3 ||
    month === 5 ||
    month === 7 ||
    month === 8 ||
    month === 10 ||
    month === 12
  ) {
    return 31
  } else if (month === 4 || month === 6 || month === 9 || month === 11) {
    return 30
  } else if (month === 2) {
    if (year % 4 === 0) {
      return 29
    } else {
      return 28
    }
  }
}

exports.standardInfo = (type, value, sd, median) => {
  const sd2 = median + 2 * sd
  const sd15 = median + 1.5 * sd
  const SD_15 = median - 1.5 * sd
  const SD_2 = median - 2 * sd

  if (value >= sd2) {
    if (type === 'standard_one') {
      return {
        list: 'น้ำหนักเกินเกณฑ์',
        color: '#BF2202'
      }
    } else if (type === 'standard_two') {
      return { list: 'สูง', color: '#1278FA' }
    }
  } else if (value < sd2 && value > sd15) {
    if (type === 'standard_one') {
      return { list: 'น้ำหนักค่อนข้างมาก', color: '#EA7202' }
    } else if (type === 'standard_two') {
      return { list: 'ค่อนข้างสูง', color: '#EA7202' }
    }
  } else if (value < sd15 && value > SD_15) {
    if (type === 'standard_one') {
      return { list: 'น้ำหนักตามเกณฑ์', color: '#038518' }
    } else if (type === 'standard_two') {
      return { list: 'ส่วนสูงตามเกณฑ์', color: '#038518' }
    }
  } else if (value < SD_15 && value > SD_2) {
    if (type === 'standard_one') {
      return { list: 'น้ำหนักค่อนข้างน้อย', color: '#EA7202' }
    } else if (type === 'standard_two') {
      return { list: 'ค่อนข้างเตี้ย', color: '#EA7202' }
    }
  } else if (value < SD_2) {
    if (type === 'standard_one') {
      return { list: 'น้ำหนักน้อยกว่าเกณฑ์', color: '#BF2202' }
    } else if (type === 'standard_two') {
      return { list: 'เตี้ย', color: '#BF2202' }
    }
  } else if (value === 0) {
    return { list: '', color: '#FEFEFE' }
  }
}

exports.weightHeightInfo = (value, sd, median) => {
  const sd3 = median + 3 * sd
  const sd2 = median + 2 * sd
  const sd15 = median + 1.5 * sd
  const SD_15 = median - 1.5 * sd
  const SD_2 = median - 2 * sd

  if (value >= sd3) {
    return { list: 'อ้วน', color: '#BF2202' }
  } else if (value < sd3 && value > sd2) {
    return { list: 'เริ่มอ้วน', color: '#EA7202' }
  } else if (value < sd2 && value > sd15) {
    return { list: 'ท้วม', color: '#ECA203' }
  } else if (value < sd15 && value > SD_15) {
    return { list: 'สมส่วน', color: '#038518' }
  } else if (value < SD_15 && value > SD_2) {
    return { list: 'ค่อนข้างผอม', color: '#EA7202' }
  } else if (value < SD_2) {
    return { list: 'ผอม', color: '#BF2202' }
  } else if (value === 0) {
    return { list: '', color: '#FEFEFE' }
  }
}

exports.getConditionMonthValue = (date, findAmountDay) => {
  const splitDate = date.split('-')

  const amountDay = findAmountDay(
    parseInt(splitDate[1]),
    parseInt(splitDate[0])
  )

  const lessThanDate =
    splitDate[0] +
    '-' +
    splitDate[1] +
    '-' +
    amountDay.toString() +
    'T00:00:00.000+00:00'
  const greaterThanDate =
    splitDate[0] + '-' + splitDate[1] + '-' + '01' + 'T00:00:00.000+00:00'

  return {
    lessThanDate,
    greaterThanDate,
    amountDay,
    splitDate
  }
}

exports.prepareGadgetInfo = (gadgetList, dateCondition) => {
  // if never check in that month
  if (gadgetList.length === 0) {
    return {
      ok: [0, 0, 0, 0, 0],
      notOk: [0, 0, 0, 0, 0],
      total: dateCondition.amountDay
    }
  }

  let haveMilk = 0
  let notHaveMilk = 0

  let havePamper = 0
  let notHavePamper = 0

  let haveBottle = 0
  let notHaveBottle = 0

  let haveMilkBottle = 0
  let notHaveMilkBottle = 0

  let haveTowel = 0
  let notHaveTowel = 0

  for (let i = 0; i < gadgetList.length; i++) {
    if (gadgetList[i].milk === null) {
      // Nothing
    } else if (gadgetList[i].milk) {
      haveMilk++
    } else {
      notHaveMilk++
    }
    if (gadgetList[i].pamper === null) {
      // Nothing
    } else if (gadgetList[i].pamper) {
      havePamper++
    } else {
      notHavePamper++
    }
    if (gadgetList[i].bottle === null) {
      // Nothing
    } else if (gadgetList[i].bottle) {
      haveBottle++
    } else {
      notHaveBottle++
    }
    if (gadgetList[i].milk_bottle === null) {
      // Nothing
    } else if (gadgetList[i].milk_bottle) {
      haveMilkBottle++
    } else {
      notHaveMilkBottle++
    }
    if (gadgetList[i].towel === null) {
      // Nothing
    } else if (gadgetList[i].towel) {
      haveTowel++
    } else {
      notHaveTowel++
    }
  }

  return {
    ok: [haveMilk, havePamper, haveBottle, haveMilkBottle, haveTowel],
    notOk: [notHaveMilk, notHavePamper, notHaveBottle, notHaveMilkBottle, notHaveTowel],
    total: dateCondition.amountDay
  }
}

exports.prepareHealthInfo = (healthList, dateCondition) => {
  if (healthList.length === 0) {
    return {
      ok: [0, 0, 0, 0, 0, 0, 0, 0],
      notOk: [0, 0, 0, 0, 0, 0, 0, 0],
      total: dateCondition.amountDay
    }
  }
  let checkBreakfast = 0
  let notCheckBreakfast = 0

  let checkCloth = 0
  let notCheckCloth = 0

  let checkHead = 0
  let notCheckHead = 0

  let checkEar = 0
  let notCheckEar = 0

  let checkNail = 0
  let notCheckNail = 0

  let checkSkin = 0
  let notCheckSkin = 0

  let checkTemperature = 0
  let notCheckTemperature = 0

  let checkWound = 0
  let notCheckWound = 0

  for (let i = 0; i < healthList.length; i++) {
    if (healthList[i].breakfast === null) {
      // Nothing
    } else if (healthList[i].breakfast) {
      checkBreakfast++
    } else {
      notCheckBreakfast++
    }
    if (healthList[i].cloth === null) {
      // Nothing
    } else if (healthList[i].cloth) {
      checkCloth++
    } else {
      notCheckCloth++
    }
    if (healthList[i].head === null) {
      // Nothing
    } else if (healthList[i].head) {
      checkHead++
    } else {
      notCheckHead++
    }
    if (healthList[i].ear === null) {
      // Nothing
    } else if (healthList[i].ear) {
      checkEar++
    } else {
      notCheckEar++
    }
    if (healthList[i].nail === null) {
      // Nothing
    } else if (healthList[i].nail) {
      checkNail++
    } else {
      notCheckNail++
    }
    if (healthList[i].skin === null) {
      // Nothing
    } else if (healthList[i].skin) {
      checkSkin++
    } else {
      notCheckSkin++
    }
    if (healthList[i].temperature === null) {
      // Nothing
    } else if (healthList[i].temperature) {
      checkTemperature++
    } else {
      notCheckTemperature++
    }
    if (healthList[i].wound === null) {
      // Nothing
    } else if (healthList[i].wound) {
      checkWound++
    } else {
      notCheckWound++
    }
  }

  return {
    ok: [checkBreakfast, checkCloth, checkHead, checkEar, checkNail, checkSkin, checkTemperature, checkWound],
    notOk: [notCheckBreakfast, notCheckCloth, notCheckHead, notCheckEar, notCheckNail, notCheckSkin, notCheckTemperature, notCheckWound],
    total: dateCondition.amountDay
  }
}
