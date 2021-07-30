import * as TYPES from "./types";
import API from "helpers/api";
import history from "helpers/history";

export const getAllSurveys = () => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.GET_ALL_SURVEYS_LOADING,
    });

    API.get("/dashboard/surveys")
      .then((res) =>
        dispatch({
          type: TYPES.GET_ALL_SURVEYS_SUCCESS,
          payload: res.data.surveys,
        })
      )
      .catch(() => dispatch({ type: TYPES.GET_ALL_SURVEYS_FAILURE }));
  };
};

export const createSurvey = (surveyInfo) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.CREATE_SURVEY_LOADING,
    });

    API.post("/dashboard/surveys", surveyInfo)
      .then((res) =>
        dispatch({
          type: TYPES.CREATE_SURVEY_SUCCESS,
        })
      )
      .catch((err) => {
        dispatch({
          type: TYPES.CREATE_SURVEY_FAILURE,
          payload: err.response || {},
        });
      });
  };
};
