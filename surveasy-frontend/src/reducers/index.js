import { USER_LOGOUT_SUCCESS } from "actions/users/types";
import { combineReducers } from "redux";
import userReducer from "./userReducers";
import dashboardReducer from "./dashboardReducers";
import surveyReducer from "./surveyReducers";
import respondentReducer from "./respondentReducer";

const appReducer = combineReducers({
  user: userReducer,
  dashboard: dashboardReducer,
  survey: surveyReducer,
  respondent: respondentReducer,
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT_SUCCESS) {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
