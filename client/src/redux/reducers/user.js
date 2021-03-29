const initialState = {
  position: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_POSITION":
      // {console.log(action.payload)}
      return {
        ...state,
        position: action.payload,
      };
    case "RESET_POSITION":
      return {
        ...state,
        position: '',
      };
    default:
      return state;
  }
};
