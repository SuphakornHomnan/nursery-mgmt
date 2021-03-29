const initialState = {
  uniformObj: {
    shirt: '',
    shirt_num: 0,
    pants: '',
    pants_num: 0,
    dresses: '',
    dresses_num: 0,
    pajama: '',
    pajama_num: 0,
    apron: '',
    apron_num: 0,
    sport: '',
    sport_num: 0,
    cloth_bag: false,
    school_bag: false,
  },
  uniformList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_UNIFORM_OBJ":
      return {
        ...state,
        uniformObj: action.payload,
      };
    case "SET_UNIFORM_LIST":
      return {
        ...state,
        uniformList: action.payload,
      };
    default:
      return state;
  }
};
