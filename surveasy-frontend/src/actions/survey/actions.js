import * as TYPES from "./types";
import API from "helpers/api";

export const getSurveyById = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.GET_SURVEY_LOADING,
    });
    API.get(`/dashboard/surveys/${id}`)
      .then((res) => {
        console.log(res);
        dispatch({
          type: TYPES.GET_SURVEY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: TYPES.GET_SURVEY_FAILURE,
          payload: err.response || {},
        });
      });
  };
};
