import axios from "axios";
import { server } from "../store";

export const userLoginRequest = () => {
  return {
    type: "LOGIN_REQUEST",
  };
};

export const userLoginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const userLoginFailure = (message) => {
  return {
    type: "LOGIN_FAILURE",
    message,
  };
};

export const userLoginAsync = (email, password) => {
  return async function (dispatch) {
    try {
      dispatch(userLoginRequest());

      const { data } = await axios.post(
        `${server}/users/signin`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(userLoginSuccess(data));
    } catch (error) {
      dispatch(userLoginFailure(error.response.data.message));
    }
  };
};

//Owner Register
export const ownerRegisterRequest = () => {
  return {
    type: "REGISTER_REQUEST",
  };
};

export const ownerRegisterSuccess = (data) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: data,
  };
};

export const ownerRegisterFailure = (message) => {
  return {
    type: "REGISTER_FAILURE",
    message,
  };
};

export const ownerRegisterAsync = ({ name, email, phone, gender, type, gymName, password }) => {
  return async function (dispatch) {
    try {
      dispatch(ownerRegisterRequest());

      const { data } = await axios.post(
        `${server}/users/signup`,
        { name, email, phone, gender, type, gymName, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      dispatch(ownerRegisterSuccess(data));
    } catch (error) {
      dispatch(ownerRegisterFailure(error.response.data.message));
    }
  };
};

//Logout action
export const userLogoutRequest = () => {
  return {
    type: "LOGOUT_REQUEST",
  };
};