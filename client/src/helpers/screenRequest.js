exports.profileInfoReq = (compare, prevReq, date) => {
  let weight = null,
    height = null,
    father_name = null,
    father_phone = null,
    mother_name = null,
    mother_phone = null,
    nickname = null,
    room = null,
    url = null,
    hospital = null;
  if (compare.weight === prevReq.weight) {
  } else {
    weight = prevReq.weight;
  }
  if (compare.height === prevReq.height) {
  } else {
    height = prevReq.height;
  }

  if (compare.room === prevReq.room) {
  } else {
    room = prevReq.room;
  }
  if (compare.nickname === prevReq.nickname) {
  } else {
    nickname = prevReq.nickname;
  }
  if (compare.photo === prevReq.url) {
  } else {
    url = prevReq.url;
  }
  if (compare.medical === prevReq.hospital) {
  } else {
    hospital = prevReq.hospital;
  }
  if (
    compare.motherName === prevReq.mother_name &&
    compare.motherPhone === prevReq.mother_phone
  ) {
  } else {
    mother_name = prevReq.mother_name;
    mother_phone = prevReq.mother_phone;
  }

  if (
    compare.fatherName === prevReq.father_name &&
    compare.fatherPhone === prevReq.father_phone
  ) {
  } else {
    father_name = prevReq.father_name;
    father_phone = prevReq.father_phone;
  }

  return {
    weight,
    height,
    father_name,
    father_phone,
    mother_name,
    mother_phone,
    nickname,
    room,
    url,
    hospital,
    date,
  };
};
