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

export const registerUser = (userData) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.USER_REGISTER_LOADING,
    });

    await API.post("/dashboard/users/register", userData)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: TYPES.USER_REGISTER_SUCCESS, payload: res.data });
        history.push("/dashboard");
      })
      .catch((err) => {
        dispatch({
          type: TYPES.USER_REGISTER_FAILED,
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

export const getCurrentUser = () => {
  return async (dispatch) => {
    await API.get("/dashboard/users/currentUser")
      .then((res) => {
        console.log(res.data);
        setTimeout(() => {
          dispatch({
            type: TYPES.GET_CURRENT_USER_SUCCESS,
            payload: res.data,
          });
        }, 1000);
      })
      .catch((err) => {
        setTimeout(() => {
          dispatch({
            type: TYPES.GET_CURRENT_USER_FAILED,
          });
        }, 1000);
      });
  };
};
