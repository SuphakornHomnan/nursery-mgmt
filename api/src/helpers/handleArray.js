const { genderColor } = require('../helpers/getColor')

exports.setInfoAttendanceModal = (childInfo, index, selectedDateCheck) => {
  return {
    _id: childInfo.child._id,
    no: index + 1,
    name:
      childInfo.child.firstname +
      ' ' +
      childInfo.child.middlename +
      ' ' +
      childInfo.child.lastname,
    color: genderColor(childInfo.child.gender),
    nickname: childInfo.child.nickname,
    selectedDateCheck
  }
}

exports.setInfoAttendanceTable = (childInfo, index, days, attend) => {
  return {
    _id: childInfo.child._id,
    no: index + 1,
    name:
      childInfo.child.firstname +
      ' ' +
      childInfo.child.middlename +
      ' ' +
      childInfo.child.lastname,
    color: genderColor(childInfo.child.gender),
    nickname: childInfo.child.nickname,
    checking: days,
    selectedDateCheck: attend
  }
}

exports.setInfoHealthTable = (childList, index, date, findHealthInfo) => {
  if (findHealthInfo === null) {
    return {
      _id: childList.child._id,
      no: index + 1,
      name:
        childList.child.firstname +
        ' ' +
        childList.child.middlename +
        ' ' +
        childList.child.lastname,
      nickname: childList.child.nickname,
      color: genderColor(childList.child.gender),
      date,
      breakfast: null,
      head: null,
      ear: null,
      nail: null,
      skin: null,
      clothing: null,
      wound: null,
      fever: null
    }
  } else {
    return {
      _id: childList.child._id,
      no: index + 1,
      name:
        childList.child.firstname +
        ' ' +
        childList.child.middlename +
        ' ' +
        childList.child.lastname,
      nickname: childList.child.nickname,
      color: genderColor(childList.child.gender),
      date,
      breakfast: findHealthInfo.breakfast,
      head: findHealthInfo.head,
      ear: findHealthInfo.ear,
      nail: findHealthInfo.nail,
      skin: findHealthInfo.skin,
      clothing: findHealthInfo.cloth,
      wound: findHealthInfo.wound,
      fever: findHealthInfo.temperature
    }
  }
}

exports.setInfoProfileTable = (index, childInfo, dataObj, standardObj) => {
  return {
    _id: childInfo.child._id,
    no: index + 1,
    name: `${childInfo.child.firstname} ${childInfo.child.middlename} ${childInfo.child.lastname}`,
    nickname: childInfo.child.nickname,
    sex: childInfo.child.gender,
    sex_color: genderColor(childInfo.child.gender),
    age: {
      year: dataObj.yearValue,
      month: dataObj.monthValue
    },
    weight: dataObj.weightValue,
    height: dataObj.heightValue,
    weightPerAge: standardObj.standardOne.list,
    heightPerAge: standardObj.standardTwo.list,
    weightPerHeight: standardObj.standardThree.list,
    colorOne: standardObj.standardOne.color,
    colorTwo: standardObj.standardTwo.color,
    colorThree: standardObj.standardThree.color
  }
}

exports.documentInfo = (documentObj) => {
  return [
    {
      info_item: '5ff3300893a2d90abccc922e',
      status: documentObj.birth_certificate
    },
    {
      info_item: '5ff330ad93a2d90abccc922f',
      status: documentObj.id_card_father
    },
    {
      info_item: '5ff330b593a2d90abccc9230',
      status: documentObj.id_card_mother
    },
    {
      info_item: '5ff330bf93a2d90abccc9231',
      status: documentObj.house_record
    },
    {
      info_item: '5ff330c793a2d90abccc9232',
      status: documentObj.life_lnsurance_card
    },
    {
      info_item: '5ff330d293a2d90abccc9233',
      status: documentObj.health_vaccination
    },
    {
      info_item: '5ff330de93a2d90abccc9234',
      status: documentObj.baby_photo
    }
  ]
}

exports.habitInfo = (habit) => {
  // ObjectId in info_item
  const listHabitCompare = [
    '5fe0470fa420791e31609d4d',
    '5fe046d5a420791e31609d4c',
    '5fe04716a420791e31609d4e',
    '5fe0471ba420791e31609d4f',
    '5fe04723a420791e31609d50',
    '5fe0472aa420791e31609d51',
    '5fe0475da420791e31609d52',
    '5fe04772a420791e31609d54',
    '5fe0477ca420791e31609d55',
    '5fe0476ba420791e31609d53',
    '5fe0479ca420791e31609d56',
    '5fe047b0a420791e31609d57',
    '5fe047b5a420791e31609d58',
    '5fe047cfa420791e31609d59',
    '5fe047dba420791e31609d5a',
    '5fe047eda420791e31609d5b'
  ]

  const listHabitRequest = [
    habit.pillow_aficionado,
    habit.doll_aficionado,
    habit.fabric_aficionado,
    habit.pacifier_aficionado,
    habit.breast_feeding_aficionado,
    habit.crib_aficionado,
    habit.food_allergy_detail,
    habit.milk_intolerance_detail,
    habit.no_yogurt_allergy_detail,
    habit.no_allergy_to_medicine_detail,
    habit.milk_powder_in_bottle,
    habit.uht_milk_box_in_bottle,
    habit.uht_milk_box,
    habit.always_use_diaper,
    habit.not_use_diaper,
    habit.diaper_only_sleeping
  ]
  const listHabitResult = []
  for (let i = 0; i < 16; i++) {
    if (listHabitRequest[i] === false || listHabitRequest[i] === null) {
      // Do nothing
    } else {
      if (listHabitRequest[i] === true) {
        listHabitResult.push({
          info_item: listHabitCompare[i],
          itemDetail: null
        })
      } else {
        listHabitResult.push({
          info_item: listHabitCompare[i],
          itemDetail: listHabitRequest[i]
        })
      }
    }
  }
  return listHabitResult
}

exports.medicalInfo = (medicalObj) => {
  return [
    {
      info_item: '5ff42f3c6fc23712f870a9eb',
      detail: medicalObj.vaccination_against_chickenpox
    },
    {
      info_item: '5ff42f506fc23712f870a9ec',
      detail: medicalObj.vaccinated_at_the_age_of
    },
    {
      info_item: '5ff42f5e6fc23712f870a9ed',
      detail: medicalObj.Infectious_Disease_Mumps_or_Others
    },
    {
      info_item: '5ff42f6b6fc23712f870a9ee',
      detail: medicalObj.Bronchitis_Asthma_Respiratory_Tract_Disease_Others
    },
    {
      info_item: '5ff42f776fc23712f870a9ef',
      detail: medicalObj.Congenital_Heart_Disease
    },
    {
      info_item: '5ff42f806fc23712f870a9f0',
      detail: medicalObj.Diabetes
    },
    {
      info_item: '5ff42f8b6fc23712f870a9f1',
      detail: medicalObj.Epilepsy_Febrile_Seizure
    }
  ]
}
