exports.getColor = (date) => {
  const dateSplit = date.split(' ')

  switch (dateSplit[0].toUpperCase()) {
    case 'SUN':
      return '#F80602'
    case 'MON':
      return '#FBE505'
    case 'TUE':
      return '#FC0AE3'
    case 'WED':
      return '#069903'
    case 'THU':
      return '#F57504'
    case 'FRI':
      return '#040FF5'
    case 'SAT':
      return '#6E5B98'

    default:
      return 0
  }
}

exports.genderColor = (gender) => {
  switch (gender) {
    case 1:
      return '#0391F9'
    case 2:
      return '#E603F9'

    default:
      return 0
  }
}

exports.sizeColor = (size) => {
  switch (size) {
    case 'S':
      return '#F8B2A7'
    case 'M':
      return '#BDD48E'
    case 'L':
      return '#FAC76B'
    case 'XL':
      return '#CDC2D3'
    case '2XL':
      return '#6E5C98'
    case 'FREE SIZE':
      return '#3E3D53'

    default:
      return 0
  }
}

exports.roomColor = (room) => {
  switch (room) {
    case 'ห้อง ก1':
      return '#FCB239'
    case 'ห้อง ก2':
      return '#F47A27'
    case 'ห้อง ก3':
      return '#D74161'
    case 'ห้อง ก4':
      return '#6E5B98'

    default:
      return 0
  }
}

exports.roleColor = (role) => {
  switch (role) {
    case 'admin':
      return '#FCB239'
    case 'accountant':
      return '#BED290'
    case 'teacher':
      return '#B9C3D9'

    default:
      return 0
  }
}
