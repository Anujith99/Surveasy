import { produce } from "immer";
import { combineReducers } from "redux";
import * as TYPES from "actions/responses/types";

const initialResponsesState = {
  loading: false,
  responses: [],
  error: false,
  errorMessage: null,
};

const responseSummaryReducer = (state = initialResponsesState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.GET_RESPONSES_LOADING:
        draftState.loading = true;
        draftState.error = false;
        draftState.errorMessage = null;
        break;
      case TYPES.GET_RESPONSES_SUCCESS:
        draftState.loading = false;
        draftState.responses = action.payload.summary;
        break;
      case TYPES.GET_RESPONSES_FAILURE:
        draftState.loading = false;
        draftState.error = true;
        if (action.payload.data) {
          draftState.errorMessage = action.payload.data.message;
        } else {
          draftState.errorMessage = null;
        }
        break;
      case TYPES.GET_RESPONSES_RESET:
        return initialResponsesState;
      default:
        break;
    }
  });
};

export default combineReducers({
  summary: responseSummaryReducer,
});
