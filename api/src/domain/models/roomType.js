exports.firstRoom = '5fc62c42859bd78a633e6221'
exports.secondRoom = '5fc62ce3859bd78a633e6222'
exports.thirdRoom = '5fc62ce7859bd78a633e6223'
exports.forthRoom = '5fc62cea859bd78a633e6224'

exports.stringToObjectId = (room) => {
  switch (room) {
    case 'ห้อง ก1':
      return this.firstRoom
    case 'ห้อง ก2':
      return this.secondRoom
    case 'ห้อง ก3':
      return this.thirdRoom
    case 'ห้อง ก4':
      return this.forthRoom
    default:
      return 0
  }
}
