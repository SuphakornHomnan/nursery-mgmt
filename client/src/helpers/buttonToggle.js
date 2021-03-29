export const handleStatusClick = (check) => {
  if (check === null) {
    return true;
  } else if (check === true) {
    return false;
  } else if (check === false) {
    return true;
  }
};

export const handleStatusClick_v2 = (check) => {
  if (check === null) {
    return true;
  }
  if (check === true) {
    return false;
  }
  if (check === false) {
    return null;
  }
};
