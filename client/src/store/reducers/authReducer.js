import {
    LOGOUT_SUCCESS,
    LOGIN_WITH_EMAIL_LOADING,
    LOGIN_WITH_EMAIL_SUCCESS,
    LOGIN_WITH_EMAIL_FAIL,
    ME_LOADING,
    ME_SUCCESS,
    ME_FAIL,
  } from '../types';
  
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    isLoading: false,
    me: null,
    error: null,
    appLoaded: false,
  };
  
  export default function (state = initialState, { type, payload }) {
    switch (type) {
      case ME_LOADING:
        return {
          ...state,
          isLoading: true,
          appLoaded: false,
          error: null,
        };
      case LOGIN_WITH_EMAIL_LOADING:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case LOGIN_WITH_EMAIL_SUCCESS:
        localStorage.setItem('token', payload.token);
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          token: payload.token,
          me: payload.me,
          error: null,
        };
      case ME_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          me: payload.me,
          error: null,
          appLoaded: true,
        };
      case ME_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          isAuthenticated: false,
          isLoading: false,
          me: null,
          error: "Invalid creds",
          appLoaded: true,
        };
      case LOGOUT_SUCCESS:
      case LOGIN_WITH_EMAIL_FAIL:
        localStorage.removeItem('token');
        return {
          ...state,
          token: null,
          me: null,
          isAuthenticated: false,
          isLoading: false,
          error: "Incorrect Creads", //payload message ovde i razdvoj logout i fail
        };
      default:
        return state;
    }
  }
  