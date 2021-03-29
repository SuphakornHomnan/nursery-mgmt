import moment from "moment";
const initialState = {
  list_child: [],
  button_status: false,
  checkList: [],
  loadingSpinner: false,
  select_date: moment().format("YYYY-MM-DD"),
  spinner_modal: false,
  modal_list: [],
  show_date: '',
  date_change: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_CHILD_MAIN":
      let answer = action.payload.data;
      return {
        ...state,
        list_child: answer,
      };
    case "CHECK_STATUS_TRUE":
      // console.log(action.payload);
      return {
        ...state,
        button_status: action.payload,
      };
    case "SEND_LIST_ATTENDANCE":
      let index = action.index - 1;
      state.checkList[index] = action.payload;
      let temp = [...state.checkList];
      return {
        ...state,
        checkList: temp,
      };
    case "SET_LOADING_SPINNER_ATTEND":
      return {
        ...state,
        loadingSpinner: action.payload,
      };
    case "SET_SPINNER_ATTEND_MODAL":
      return {
        ...state,
        spinner_modal: action.payload,
      };

    case "SET_MODAL_CHILD":
      return {
        ...state,
        modal_list: action.payload,
      };
    case "SET_SHOW_DATE_MODAL":
      return {
        ...state,
        show_date: action.payload,
      };
    case "SET_SELECT_DATE":
      return {
        ...state,
        select_date: action.payload,
      };
    case "SET_DATE_CHANGE":
      return {
        ...state,
        date_change: action.payload,
      };
    case "UPDATE_ATTEND":
      return {
        ...state,
        list_child : state.list_child.map(child=>{
          if(child._id === action.payload.id){
            return {
              ...child,
              checking : child.checking.map((c)=>{
                if(c.Day === action.payload.date){
                  return {
                    ...c,
                    attend : action.payload.att
                  }
                }
                return c
              })
            }
          }
          return child
        })
      }
    default:
      return state;
  }
};
