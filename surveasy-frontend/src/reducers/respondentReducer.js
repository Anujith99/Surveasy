import * as TYPES from "actions/respondent/types";
import { produce } from "immer";
import { combineReducers } from "redux";

const initialQuestionsState = {
  loading: false,
  survey: {},
  error: false,
  errorMessage: null,
};

const getQuestionsReducer = (state = initialQuestionsState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.GET_QUESTIONS_LOADING:
        draftState.loading = true;
        draftState.error = false;
        draftState.errorMessage = null;
        break;
      case TYPES.GET_QUESTIONS_SUCCESS:
        draftState.loading = false;
        draftState.survey = action.payload.survey;
        break;
      case TYPES.GET_QUESTIONS_FAILURE:
        draftState.loading = false;
        draftState.error = true;
        if (action.payload.data) {
          draftState.errorMessage = action.payload.data.message;
        } else {
          draftState.errorMessage =
            "Could not find this survey. Please check if the URL is correct.";
        }
        break;
      default:
        break;
    }
  });
};

const submitInitialState = {
  loading: false,
  success: false,
  error: false,
  errorMessage: null,
};

const submitResponseReducer = (state = submitInitialState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.SUBMIT_RESPONSE_LOADING:
        draftState.loading = true;
        draftState.error = false;
        draftState.errorMessage = null;
        break;
      case TYPES.SUBMIT_RESPONSE_SUCCESS:
        draftState.loading = false;
        draftState.success = true;
        break;
      case TYPES.SUBMIT_RESPONSE_FAILURE:
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

export default combineReducers({
  questions: getQuestionsReducer,
  response: submitResponseReducer,
});
