import * as TYPES from "actions/survey/types";
import { produce } from "immer";
import { combineReducers } from "redux";

const initialSurveyState = {
  loading: false,
  survey: {},
  error: false,
  errorMessage: null,
};

const surveyHomeReducer = (state = initialSurveyState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.GET_SURVEY_LOADING:
        draftState.loading = true;
        draftState.error = false;
        break;
      case TYPES.GET_SURVEY_SUCCESS:
        draftState.loading = false;
        draftState.survey = action.payload.survey;
        break;
      case TYPES.SURVEY_FORM_SUCCESS:
      case TYPES.UPDATE_SURVEY:
        draftState.survey = action.payload.survey;
        break;
      case TYPES.GET_SURVEY_FAILURE:
        draftState.loading = false;
        draftState.error = true;
        if (action.payload.data) {
          draftState.errorMessage = action.payload.data.message;
        } else {
          draftState.errorMessage = null;
        }
        break;
      default:
        break;
    }
  });
};

const initialConfirmState = {
  loading: false,
  success: false,
  error: false,
  errorMessage: null,
};

const surveyConfirmReducer = (state = initialConfirmState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.SURVEY_CONFIRM_LOADING:
        draftState.loading = true;
        draftState.error = false;
        break;
      case TYPES.SURVEY_CONFIRM_SUCCESS:
        draftState.loading = false;
        draftState.success = true;
        break;
      case TYPES.SURVEY_CONFIRM_FAILURE:
        draftState.loading = false;
        draftState.error = true;
        if (action.payload.data) {
          draftState.errorMessage = action.payload.data.message;
        } else {
          draftState.errorMessage = null;
        }
        break;
      case TYPES.SURVEY_CONFIRM_RESET:
        return initialConfirmState;
      default:
        break;
    }
  });
};

const initialSurveyFormState = {
  loading: false,
  success: false,
  error: false,
  errorMessage: "",
};

const surveyFormReducer = (state = initialSurveyFormState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.SURVEY_FORM_LOADING:
        draftState.loading = true;
        draftState.error = false;
        break;
      case TYPES.SURVEY_FORM_SUCCESS:
        draftState.loading = false;
        draftState.success = true;
        break;
      case TYPES.SURVEY_FORM_FAILURE:
        draftState.loading = false;
        draftState.error = true;
        if (action.payload.data) {
          draftState.errorMessage = action.payload.data.message;
        } else {
          draftState.errorMessage = null;
        }
        break;
      case TYPES.SURVEY_FORM_RESET:
        return initialSurveyFormState;
      default:
        break;
    }
  });
};

export default combineReducers({
  surveyHome: surveyHomeReducer,
  confirm: surveyConfirmReducer,
  surveyForm: surveyFormReducer,
});
