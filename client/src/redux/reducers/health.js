const initialState = {
  list_child: [],
  checkList: [],
  loadingSpinner: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_CHILD_MAIN_HEALTH":
      return {
        ...state,
        list_child: action.payload,
      };
    case "SEND_LIST_HEALTH":
      let index = action.index - 1;
      state.checkList[index] = action.payload;
      let temp = [...state.checkList];
      return {
        ...state,
        checkList: temp,
      };
    case "SET_LOADING_SPINNER_HEALTH":
      return {
        ...state,
        loadingSpinner: action.payload,
      };
    default:
      return state;
  }
};
