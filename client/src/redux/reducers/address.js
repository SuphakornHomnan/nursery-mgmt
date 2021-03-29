const initialState = {
  addressObj: {
    name_village: '',
    house_number: '',
    moo: '',
    sub_district: '',
    district: '',
    province: '',
    telephone: '',
    house_map: '',
  },
  progress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        addressObj: action.payload,
      };
    case "SET_PROGRESS_ADDRESS":
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};
