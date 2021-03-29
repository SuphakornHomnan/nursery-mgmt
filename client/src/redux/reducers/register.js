const initialState = {
  registerForm: {
    child: {},
    father: {},
    mother: {},
    custodian: {},
    address: {},
  },
  show_child: [],
  select_id: '',
  docForm: {
    child: '',
    document: {},
    habit: {},
    medical: {},
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_VALUE_IN_FORM":
      return {
        ...state,
        registerForm: action.payload,
      };
    case "SET_VALUE_IN_DOC_FORM":
      return {
        ...state,
        docForm: action.payload,
      };
    case "SET_SHOW_CHILD_DOC_FORM":
      return {
        ...state,
        show_child: action.payload.data,
      };
    case "SET_SELECT_ID":
      return {
        ...state,
        select_id: action.payload,
      };
    default:
      return state;
  }
};
