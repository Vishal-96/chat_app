import axios from "axios";
import { SERVER_BASE_URL } from "../../constants";
import { attachTokenToHeaders } from './authActions';
import { GET_USERS_LOADING, GET_USERS_SUCCESS, GET_USERS_FAIL } from "../types";

export const getUsers = () => async (dispatch, getState) => {
  dispatch({
    type: GET_USERS_LOADING,
  });
  try {
    const options = attachTokenToHeaders(getState);
    const response = await axios.get(`${SERVER_BASE_URL}/api/users`, options);

    dispatch({
      type: GET_USERS_SUCCESS,
      payload: { users: response.data.users },
    });
  } catch (err) {
    console.log({err})
    dispatch({
      type: GET_USERS_FAIL,
      payload: err.message,
    });
  }
};
