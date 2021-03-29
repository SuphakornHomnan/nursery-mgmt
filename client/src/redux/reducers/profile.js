import { GET_PROFILE_CHILD } from "../types/profile";

const initialState = {
  list_child: [],
  child_info: {},
  loadingSpinner: false,
  _id: "",
  editObj: {},
  progress: 0,
  docFormStatus: true,
  quitChild:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_CHILD:
      let answer = action.payload;
      return {
        ...state,
        list_child: answer,
      };
    case "GET_PROFILE_INFO":
      return {
        ...state,
        child_info: action.payload,
      };
    case "SET_LOADING_SPINNER":
      return {
        ...state,
        loadingSpinner: action.payload,
      };
    case "SET_EDIT_INFO":
      return {
        ...state,
        editObj: action.payload,
      };
    case "SET_PROGRESS_PROFILE_INFO":
      return {
        ...state,
        progress: action.payload,
      };
    case "SET_CHILD_ID":
      return {
        ...state,
        _id: action.payload,
      };
    case 'SET_STATUS_DOC_FORM_BUTTON':
      return {
        ...state,
        docFormStatus: action.payload
      }
    case 'SET_QUIT_CHILD_LIST':
      return {
        ...state,
        quitChild: action.payload
      }
    default:
      return state;
  }
};
