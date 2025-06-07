// reducers/index.js
import { combineReducers } from "redux";
import loginReducer from "./login"; // import đúng tên

const allReducers = combineReducers({
  login: loginReducer,
});

export default allReducers;
