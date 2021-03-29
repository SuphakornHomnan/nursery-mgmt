const initialState = {
  child_history: [],
  child_add: [],
  child_handle: [],
  send_add: {},
  send_handle: {},
  pic_slip: [],
  select_child_slip: [],
  spinner_main: false,
  spinner_child: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_PAYMENT_HISTORY":
      return {
        ...state,
        child_history: action.payload,
      };
    case "EDIT_SLIP_NO":
      return {
        ...state,
        child_history: state.child_history.map(data=>{
          if(data.payment_id === action.payload._id){
            return{
              ...data,
              slipNo: action.payload.slipNo
            }
          }
          return data
        })
      }

      case "EDIT_INVOICE_NUM":

        return {
          ...state,
          child_history: state.child_history.map(data=>{
            if(data.payment_id === action.payload._id){
              return{
                ...data,
                invoiceNum: action.payload.invoiceNum
              }
            }
            return data
          })
        }
    case "SET_PAYMENT_ADD":
      return {
        ...state,
        child_add: action.payload,
      };
    case "SET_PAYMENT_HANDLE":
      return {
        ...state,
        child_handle: action.payload,
      };
    case "SET_SEND_ADD_OBJ":
      return {
        ...state,
        send_add: action.payload,
      };
    case "SET_SEND_HANDLE_OBJ":
      return {
        ...state,
        send_handle: action.payload,
      };
    case "SET_PICTURE_SLIP":
      return {
        ...state,
        pic_slip: action.payload,
      };
    case "SET_SELECT_CHILD_SLIP":
      return {
        ...state,
        select_child_slip: action.type,
      };
    case "SET_SPINNER_MAIN":
      return {
        ...state,
        spinner_main: action.payload,
      };
    case "SET_SPINNER_CHILD":
      return {
        ...state,
        spinner_child: action.payload,
      };
    default:
      return state;
  }
};
