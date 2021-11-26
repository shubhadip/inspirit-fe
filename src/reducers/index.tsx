import { combineReducers } from "redux";
import authReducer from "./auth_reducer";
import commonReducer from "./common_reducer";

export default combineReducers({
  auth: authReducer,
  common: commonReducer,
});