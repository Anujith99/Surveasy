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
      .catch((err) =>
        dispatch({
          type: TYPES.GET_QUESTIONS_FAILURE,
          payload: err.response || {},
        })
      );
  };
};
