import moment from "moment";
const initialState = {
  fatherObj: {
    father_name: '',
    occupation: '',
    id_card: '',
    email: '',
    telephone: '',
  },
  motherObj: {
    name: '',
    occupation: '',
    id_card: '',
    email: '',
    telephone: '',
  },
  custodianObj: {
    name: '',
    occupation: '',
    id_card: '',
    relationship: '',
    email: '',
    telephone: '',
    date_sign: moment().format("YYYY-MM-DD"),
    url: '',
  },
  progress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_FATHER_DETAIL":
      return {
        ...state,
        fatherObj: action.payload,
      };
    case "SET_MOTHER_DETAIL":
      return {
        ...state,
        motherObj: action.payload,
      };
    case "SET_CUSTODIAN_DETAIL":
      return {
        ...state,
        custodianObj: action.payload,
      };
    case "SET_PROGRESS_CUSTODIAN":
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};
