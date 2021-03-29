const initialState = {
  list_child: [],
  checkList: [],
  loadingSpinner: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_CHILD_MAIN_GADGET":
      return {
        ...state,
        list_child: action.payload.data,
      };
    case "SEND_LIST":
      //console.log(state.checkList);
      let index = action.index - 1;
      //console.log(action.payload);
      state.checkList[index] = action.payload;
      let temp = [...state.checkList];
      //console.log("temp");
      //console.log(temp);
      return {
        ...state,
        checkList: temp,
      };
    case "SET_LOADING_SPINNER_GADGET":
      return {
        ...state,
        loadingSpinner: action.payload,
      };
    default:
      return state;
  }
};
