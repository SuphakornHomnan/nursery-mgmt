import { combineReducers } from "redux";
import childReducer from "./child";
import attendanceReducer from "./attendance";
import chartReducer from './chart'
import gadgetReducer from "./gadget";
import healthReducer from "./health";
import profileReducer from "./profile";
import userReducer from "./user";
import custodianReducer from "./custodian";
import dateReducer from "./date";
import roomReducer from "./room";
import stockReducer from "./stock";
import paymentReducer from "./payment";
import medicalReducer from "./medical";
import registerReducer from "./register";
import addressReducer from "./address";
import documentReducer from "./document";
import habitReducer from "./habit";
import uniformReducer from "./uniform";

export default combineReducers({
  childReducer,
  attendanceReducer,
  chartReducer,
  gadgetReducer,
  healthReducer,
  profileReducer,
  userReducer,
  custodianReducer,
  dateReducer,
  roomReducer,
  medicalReducer,
  addressReducer,
  documentReducer,
  habitReducer,
  registerReducer,
  stockReducer,
  paymentReducer,
  uniformReducer,
});
