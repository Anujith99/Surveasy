import * as TYPES from "./types";
import API from "helpers/api";
import history from "helpers/history";

export const loginUser = (loginCredentials, redirectTo) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.USER_LOGIN_LOADING,
    });

    await API.post("/dashboard/users/login", loginCredentials)
      .then((res) => {
        dispatch({ type: TYPES.USER_LOGIN_SUCCESS, payload: res.data });
        history.push(redirectTo);
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
    dispatch({
      type: TYPES.USER_LOGOUT_LOADING,
    });
    await API.post("/dashboard/users/logout")
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: TYPES.USER_LOGOUT_SUCCESS,
          });
          history.push("/signin");
        }, 800);
      })
      .catch((err) => {
        dispatch({
          type: TYPES.USER_LOGOUT_FAILED,
          payload: "Logout Failed. Please try again.",
        });
      });
  };
};

export const getCurrentUser = () => {
  return async (dispatch) => {
    await API.get("/dashboard/users/currentUser")
      .then((res) => {
        dispatch({
          type: TYPES.GET_CURRENT_USER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: TYPES.GET_CURRENT_USER_FAILED,
        });
      });
  };
};

export const updateUser = (data) => {
  return async (dispatch) => {
    dispatch({
      type: TYPES.USER_PROFILE_UPDATE_LOADING,
    });
    await API.put("/dashboard/users/profile", data)
      .then((res) => {
        dispatch({
          type: TYPES.USER_PROFILE_UPDATE_SUCCESS,
        });
        dispatch({
          type: TYPES.GET_CURRENT_USER_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: TYPES.USER_PROFILE_UPDATE_FAILED,
          payload: err.response || {},
        });
      });
  };
};

export const resetState = () => {
  return async (dispatch) => {
    dispatch({ type: TYPES.USER_PROFILE_UPDATE_RESET });
  };
};
