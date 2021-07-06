import * as TYPES from "actions/users/types";
import { combineReducers } from "redux";
import { produce } from "immer";

let initialFormState = {
  loading: false,
  error: false,
  errorMessage: null,
};

const loginReducer = (state = initialFormState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.USER_LOGIN_LOADING:
        draftState.loading = true;
        draftState.error = false;
        draftState.errorMessage = null;
        break;
      case TYPES.USER_LOGIN_SUCCESS:
        draftState.loading = false;
        break;
      case TYPES.USER_LOGIN_FAILED:
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

const registerReducer = (state = initialFormState, action) => {
  return produce(state, (draftState) => {
    switch (action.type) {
      case TYPES.USER_REGISTER_LOADING:
        draftState.loading = true;
        draftState.error = false;
        draftState.errorMessage = null;
        break;
      case TYPES.USER_REGISTER_SUCCESS:
        draftState.loading = false;
        break;
      case TYPES.USER_REGISTER_FAILED:
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
  login: loginReducer,
  register: registerReducer,
});