const initialState = {
  history_stock: [],
  list_stock: [],
  handle_stock: [],
  loadingSpinner: false,
  spinner_modal: false,
  spinner_history: false,
  size: "S",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_STOCK":
      return {
        ...state,
        list_stock: action.payload.data,
      };
    case "HANDLE_STOCK":
      return {
        ...state,
        handle_stock: action.payload.data,
      };
    case "SHOW_HISTORY":
      return {
        ...state,
        history_stock: action.payload.data,
      };
    case "SET_LOADING_SPINNER_STOCK":
      return {
        ...state,
        loadingSpinner: action.payload,
      };
    case "SET_LOADING_SPINNER_STOCK_MODAL":
      return {
        ...state,
        spinner_modal: action.payload,
      };
    case "SET_LOADING_SPINNER_STOCK_HISTORY":
      return {
        ...state,
        spinner_history: action.payload,
      };
    case "SET_SIZE":
      return {
        ...state,
        size: action.payload,
      };
    default:
      return state;
  }
};
