// reducers/index.js
import { combineReducers } from "redux";
import loginReducers from "./login";

const allReducers = combineReducers({
  login: loginReducers, // Đặt tên state rõ ràng
});

export default allReducers;
