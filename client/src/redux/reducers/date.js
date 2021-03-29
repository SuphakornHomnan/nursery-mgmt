const initialState = {
  list_date: 0,
  trigger: false,
  selectedDate: "",
  triggerDayList: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_DAY_IN_MONTH":
      // console.log(action.payload);
      return {
        ...state,
        list_date: action.payload,
      };
    case "GET_DAY_IN_MONTH_STARTER":
      return {
        ...state,
        list_date: action.payload,
        trigger: true,
      };
    case "ADD_LIST_DAY":
      // console.log(action.payload);
      return {
        ...state,
        day_list: action.payload,
      };
    case "DOWN_TRIGGER":
      return {
        ...state,
        trigger: false,
      };
    case "SET_DATE":
      return {
        ...state,
        selectedDate: action.payload,
      };

    default:
      return state;
  }
};
