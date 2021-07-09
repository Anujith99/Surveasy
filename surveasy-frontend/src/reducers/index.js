import { USER_LOGOUT_SUCCESS } from "actions/users/types";
import { combineReducers } from "redux";
import userReducer from "./userReducers";

const appReducer = combineReducers({
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
