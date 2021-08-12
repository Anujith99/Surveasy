import * as TYPES from "./types";
import API from "helpers/api";

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
