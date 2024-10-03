import { combineReducers } from "redux";

import usersReducer from "./usersReducers";
import registerReducer from "./registerReducer";
import authReducer from "./authReducer";

export default combineReducers({
  users: usersReducer,
  register: registerReducer,
  auth: authReducer,
});
