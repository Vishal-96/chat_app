import axios from "axios";
import { SERVER_BASE_URL } from "../../constants";

import {
  LOGOUT_SUCCESS,
  LOGIN_WITH_EMAIL_LOADING,
  LOGIN_WITH_EMAIL_SUCCESS,
  LOGIN_WITH_EMAIL_FAIL,
  ME_LOADING,
  ME_SUCCESS,
  ME_FAIL,
} from "../types";

export const loadMe = () => async (dispatch, getState) => {
  dispatch({ type: ME_LOADING });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(
      `${SERVER_BASE_URL}/api/users/me`,
      options
    );

    dispatch({
      type: ME_SUCCESS,
      payload: { me: response.data.me },
    });
  } catch (err) {
    dispatch({
      type: ME_FAIL,
      payload: { error: err.response.data.message },
    });
  }
};

export const loginUserWithEmail =
  (formData, redirectToDashboard) => async (dispatch, getState) => {
    dispatch({ type: LOGIN_WITH_EMAIL_LOADING });
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/auth/login`,
        formData
      );

      dispatch({
        type: LOGIN_WITH_EMAIL_SUCCESS,
        payload: { token: response.data.token, me: response.data.me },
      });

      dispatch(loadMe());
      redirectToDashboard();
    } catch (err) {
      dispatch({
        type: LOGIN_WITH_EMAIL_FAIL,
        payload: { error: err.response.data.message },
      });
    }
  };


export const logOutUser = (redirectToLogin) => async (dispatch) => {
  try {
    await axios.get(`${SERVER_BASE_URL}/auth/logout`);
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    if (redirectToLogin) redirectToLogin();
  } catch (err) {
    console.log(err);
  }
};

export const attachTokenToHeaders = (getState) => {
  const token = getState().auth.token;

  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
