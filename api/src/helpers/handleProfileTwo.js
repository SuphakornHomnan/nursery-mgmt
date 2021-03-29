const { convertNameMonth, convertNameDate } = require('../helpers/dateConvert')

exports.checkRelation = (list) => {
  let fatherList = null
  let motherList = null
  let otherList = null

  for (let a = 0; a < list.length; a++) {
    if (list[a].relationship === 'father') {
      fatherList = list[a]
    } else if (list[a].relationship === 'mother') {
      motherList = list[a]
    } else {
      otherList = list[a]
    }
  }

  if (
    fatherList !== null &&
    motherList !== null &&
    otherList !== null
  ) {
    return {
      fatherList: {
        name: fatherList.name,
        telephone: fatherList.telephone
      },
      motherList: {
        name: motherList.name,
        telephone: motherList.telephone
      },
      otherList: {
        name: otherList.name,
        telephone: otherList.telephone
      }
    }
  } else if (fatherList === null && motherList !== null) {
    return {
      fatherList: {
        name: null,
        telephone: null
      },
      motherList: {
        name: motherList.name,
        telephone: motherList.telephone
      },
      otherList: {
        name: otherList.name,
        telephone: otherList.telephone
      }
    }
  } else if (
    motherList === null &&
    otherList === null &&
    fatherList !== null
  ) {
    return {
      fatherList: {
        name: fatherList.name,
        telephone: fatherList.telephone
      },
      motherList: {
        name: null,
        telephone: null
      },
      otherList: {
        name: null,
        telephone: null
      }
    }
  } else if (motherList === null && fatherList !== null) {
    return {
      fatherList: {
        name: fatherList.name,
        telephone: fatherList.telephone
      },
      motherList: {
        name: null,
        telephone: null
      },
      otherList: {
        name: otherList.name,
        telephone: otherList.telephone
      }
    }
  } else if (otherList === null && fatherList !== null) {
    return {
      fatherList: {
        name: fatherList.name,
        telephone: fatherList.telephone
      },
      motherList: {
        name: motherList.name,
        telephone: motherList.telephone
      },
      otherList: {
        name: null,
        telephone: null
      }
    }
  } else if (
    fatherList === null &&
    motherList === null &&
    otherList !== null
  ) {
    return {
      fatherList: {
        name: null,
        telephone: null
      },
      motherList: {
        name: null,
        telephone: null
      },
      otherList: {
        name: otherList.name,
        telephone: otherList.telephone
      }
    }
  } else if (
    fatherList === null &&
    otherList === null &&
    motherList !== null
  ) {
    return {
      fatherList: {
        name: null,
        telephone: null
      },
      motherList: {
        name: motherList.name,
        telephone: motherList.telephone
      },
      otherList: {
        name: null,
        telephone: null
      }
    }
  } else {
    return {
      fatherList: {
        name: null,
        telephone: null
      },
      motherList: {
        name: null,
        telephone: null
      },
      otherList: {
        name: null,
        telephone: null
      }
    }
  }
}

exports.handleChild = (obj) => {
  let date = obj.child.birth_date
  // console.log(date)
  date = date.toString().split(' ')
  // console.log(date)
  const year = date[3]
  const month = date[1]
  const day = date[2]
  const dayType = date[0]

  const lengthBody = obj.child_body.length
  const lengthPhoto = obj.child_photo.length
  // console.log(year)
  // console.log(month)
  // console.log(day)

  const monthName = convertNameMonth(month)
  const showDayInModal = convertNameDate(day, monthName, year, dayType)

  return {
    name:
      obj.child.firstname +
      ' ' +
      obj.child.middlename +
      ' ' +
      obj.child.lastname,
    nickname: obj.child.nickname,
    birthDate: showDayInModal,
    weight: obj.child_body[lengthBody - 1].weight,
    height: obj.child_body[lengthBody - 1].height,
    photo: obj.child_photo[lengthPhoto - 1].url
  }
}

exports.handleChildV2 = (obj) => {
  let date = obj.child.birth_date
  // console.log(date)

  date = date.toString().split(' ')
  // console.log(date)

  const year = date[3]
  const month = date[1]
  const day = date[2]
  const dayType = date[0]

  const lengthWeight = obj.weight.length
  const lengthHeight = obj.height.length
  const lengthPhoto = obj.photo.length

  // console.log(year)
  // console.log(month)
  // console.log(day)

  const monthName = convertNameMonth(month)
  const showDayInModal = convertNameDate(day, monthName, year, dayType)
  return {
    name:
      obj.child.firstname +
      ' ' +
      obj.child.middlename +
      ' ' +
      obj.child.lastname,
    nickname: obj.child.nickname,
    birthDate: showDayInModal,
    weight: obj.weight[lengthWeight - 1].value,
    height: obj.height[lengthHeight - 1].value,
    photo: obj.photo[lengthPhoto - 1].value
  }
}

exports.combineList = (child, custodian, room, medical) => {
  let temp = null
  if (medical !== null) {
    temp = medical.hospital[medical.hospital.length - 1].value
  }
  return {
    name: child.name,
    nickname: child.nickname,
    birthDate: child.birthDate,
    weight: child.weight,
    height: child.height,
    photo: child.photo,
    fatherName: custodian.fatherList.name,
    fatherPhone: custodian.fatherList.telephone,
    motherName: custodian.motherList.name,
    motherPhone: custodian.motherList.telephone,
    custodianName: custodian.otherList.name,
    custodianPhone: custodian.otherList.telephone,
    room: room.room.name,
    medical: temp
  }
}
