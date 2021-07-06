import * as TYPES from "./types";
import API from "helpers/api";
import history from "helpers/history";

export const loginUser = (loginCredentials) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.USER_LOGIN_LOADING,
    });

    await API.post("/dashboard/users/login", loginCredentials)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: TYPES.USER_LOGIN_SUCCESS, payload: res.data });
        history.push("/dashboard");
      })
      .catch((err) => {
        dispatch({
          type: TYPES.USER_LOGIN_FAILED,
          payload: err.response || {},
        });
      });
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    await API.post("/dashboard/users/logout").then((res) => {
      console.log(res.data);
      dispatch({
        type: TYPES.USER_LOGOUT,
      });
      history.push("/signin");
    });
  };
};
