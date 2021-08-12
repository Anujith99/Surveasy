import * as TYPES from "./types";
import API from "helpers/api";
import history from "helpers/history";

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

export const toggleActivation = (id, data) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SURVEY_CONFIRM_LOADING,
    });

    API.put(`/dashboard/surveys/${id}`, data)
      .then((res) => {
        dispatch({
          type: TYPES.SURVEY_CONFIRM_SUCCESS,
        });
        dispatch({
          type: TYPES.GET_SURVEY_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: TYPES.SURVEY_CONFIRM_FAILURE,
          payload: err.response || {},
        });
      });
  };
};

export const deleteSurvey = (id) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.SURVEY_CONFIRM_LOADING,
    });

    API.delete(`/dashboard/surveys/${id}`)
      .then((res) => {
        dispatch({
          type: TYPES.SURVEY_CONFIRM_SUCCESS,
        });
        dispatch({
          type: TYPES.DELETE_SURVEY,
          payload: id,
        });
        history.push("/dashboard");
      })
      .catch((err) => {
        dispatch({
          type: TYPES.SURVEY_CONFIRM_FAILURE,
          payload: err.response || {},
        });
      });
  };
};
