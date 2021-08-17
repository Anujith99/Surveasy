import * as TYPES from "actions/dashboard/types";
import { DELETE_SURVEY } from "actions/survey/types";
import { produce } from "immer";
import { combineReducers } from "redux";

const initialDashboardState = {
  loading: false,
  surveys: [],
  error: false,
};

const dashboardHomeReducer = (state = initialDashboardState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.GET_ALL_SURVEYS_LOADING:
        draftState.loading = true;
        draftState.error = false;
        break;
      case TYPES.GET_ALL_SURVEYS_SUCCESS:
        draftState.loading = false;
        draftState.surveys = action.payload;
        break;
      case TYPES.GET_ALL_SURVEYS_FAILURE:
        draftState.loading = false;
        draftState.error = true;
        break;
      case DELETE_SURVEY:
        draftState.surveys = draftState.surveys.filter(
          (s) => s._id !== action.payload
        );
        break;
      default:
        break;
    }
  });
};

export default combineReducers({
  home: dashboardHomeReducer,
});
