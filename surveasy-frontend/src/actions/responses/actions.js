import * as TYPES from "./types";
import API from "helpers/api";

export const getResponses = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.GET_RESPONSES_LOADING,
    });
    API.get("/response/summary/" + id)
      .then((res) => {
        dispatch({
          type: TYPES.GET_RESPONSES_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: TYPES.GET_RESPONSES_FAILURE,
          payload: err.response || {},
        });
      });
  };
};

export const clearResponses = () => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.GET_RESPONSES_RESET,
    });
  };
};
