import * as TYPES from "./types";
import API from "helpers/api";

export const getQuestions = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.GET_QUESTIONS_LOADING,
    });
    API.get(`/questions/${id}`)
      .then((res) =>
        dispatch({ type: TYPES.GET_QUESTIONS_SUCCESS, payload: res.data })
      )
      .catch((err) => {
        dispatch({
          type: TYPES.GET_QUESTIONS_FAILURE,
          payload: err.response.status === 500 ? {} : err.response,
        });
      });
  };
};

export const submitResponse = (data) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SUBMIT_RESPONSE_LOADING,
    });
    API.post("/response", data)
      .then((res) => {
        if (res.status === 201) {
          dispatch({
            type: TYPES.SUBMIT_RESPONSE_SUCCESS,
          });
        }
      })
      .catch((err) => {
        dispatch({
          type: TYPES.SUBMIT_RESPONSE_FAILURE,
          payload: err.response || {},
        });
      });
  };
};
