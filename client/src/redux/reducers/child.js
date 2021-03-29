import { GET_CHILD_ROOMS } from "../types/child";
import moment from "moment";

const initialState = {
  childs: [],
  childObj: {
    firstname: '',
    middlename: "",
    lastname: '',
    nickname: '',
    race: '',
    nationality: '',
    religion: '',
    birth_date: '',
    gender: "male",
    weight: '',
    height: '',
    siblingsNum: '',
    childNum: '',
    url: '',
    history_accident: '',
    immunization_record: '',
    application_date: moment().format("YYYY-MM-DD"),
    room: "ห้อง ก1",
    startDate: moment().format("YYYY-MM-DD"),
  },
  progress: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CHILD_ROOMS:
      return {
        ...state,
        childs: action.payload,
      };
    case "SET_CHILD_DETAIL":
      return {
        ...state,
        childObj: action.payload,
      };
    case "SET_PROGRESS_CHILD":
      return {
        ...state,
        progress: action.payload,
      };
    default:
      return state;
  }
};
