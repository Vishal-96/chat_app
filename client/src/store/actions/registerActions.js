import axios from 'axios';
import { SERVER_BASE_URL } from '../../constants';

import {
  REGISTER_WITH_EMAIL_LOADING,
  REGISTER_WITH_EMAIL_SUCCESS,
  REGISTER_WITH_EMAIL_FAIL,
} from '../types';

export const registerUserWithEmail = (formData, goToLogin) => async (dispatch, getState) => {
  dispatch({ type: REGISTER_WITH_EMAIL_LOADING });
  try {
    await axios.post(`${SERVER_BASE_URL}/auth/register`, formData);
    dispatch({
      type: REGISTER_WITH_EMAIL_SUCCESS,
    });
    goToLogin();
  } catch (err) {
    dispatch({
      type: REGISTER_WITH_EMAIL_FAIL,
      payload: { error: err?.response?.data.message || err.message },
    });
  }
};
