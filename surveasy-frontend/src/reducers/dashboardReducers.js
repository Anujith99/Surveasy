import * as TYPES from "actions/dashboard/types";
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
      default:
        break;
    }
  });
};

const initialCreateSurveyState = {
  loading: false,
  success: false,
  error: false,
  errorMessage: "",
};

const createSurveyReducer = (state = initialCreateSurveyState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.CREATE_SURVEY_LOADING:
        draftState.loading = true;
        draftState.error = false;
        break;
      case TYPES.CREATE_SURVEY_SUCCESS:
        draftState.loading = false;
        draftState.success = true;
        break;
      case TYPES.CREATE_SURVEY_FAILURE:
        draftState.loading = false;
        draftState.error = true;
        if (action.payload.data) {
          draftState.errorMessage = action.payload.data.message;
        } else {
          draftState.errorMessage = null;
        }
        break;
      case TYPES.CREATE_SURVEY_RESET:
        return initialCreateSurveyState;
      default:
        break;
    }
  });
};

export default combineReducers({
  home: dashboardHomeReducer,
  createSurvey: createSurveyReducer,
});
