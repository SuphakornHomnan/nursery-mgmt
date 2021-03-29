exports.handleUniform = (uniformObj) => {
  let answer = [];
  for (let i = 0; i < 8; i++) {
    switch (i) {
      case 0:
        if (uniformObj.shirt !== null) {
          answer.push({
            item: "ชุดนักเรียน",
            size: uniformObj.shirt,
            amount: uniformObj.shirt_num,
          });
        }

        break;
      case 1:
        if (uniformObj.pants !== null) {
          answer.push({
            item: "กางเกงนักเรียน",
            size: uniformObj.pants,
            amount: uniformObj.pants_num,
          });
        }
        break;
      case 2:
        if (uniformObj.dresses !== null) {
          answer.push({
            item: "ชุดเดรส",
            size: uniformObj.dresses,
            amount: uniformObj.dresses_num,
          });
        }

        break;
      case 3:
        if (uniformObj.pajama !== null) {
          answer.push({
            item: "ชุดนอน",
            size: uniformObj.pajama,
            amount: uniformObj.pajama_num,
          });
        }

        break;
      case 4:
        if (uniformObj.apron !== null) {
          answer.push({
            item: "เอี้ยม",
            size: uniformObj.apron,
            amount: uniformObj.apron_num,
          });
        }

        break;
      case 5:
        if (uniformObj.sport !== null) {
          answer.push({
            item: "ชุดพละ",
            size: uniformObj.sport,
            amount: uniformObj.sport_num,
          });
        }

        break;
      case 6:
        if (uniformObj.cloth_bag) {
          answer.push({
            item: "ถุงผ้า",
            size: "Free Size",
            amount: 1,
          });
        }
        break;
      case 7:
        if (uniformObj.school_bag) {
          answer.push({
            item: "กระเป๋านักเรียน",
            size: "Free Size",
            amount: 1,
          });
        }
        break;
      default:
        break;
    }
  }
  return answer;
};
