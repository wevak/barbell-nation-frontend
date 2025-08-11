import axios from "axios";
import { server } from "../store";

export const packageRegisterRequest = () => {
  return {
    type: "PACKAGE_REGISTER_REQUEST",
  };
};

export const packageRegisterSuccess = (data) => {
  return {
    type: "PACKAGE_REGISTER_SUCCESS",
    payload: data,
  };
};

export const packageRegisterFailure = (message) => {
  return {
    type: "PACKAGE_REGISTER_FAILURE",
    message,
  };
};

export const packageRegisterAsync = ({ name, duration, amount }) => {
  return async function (dispatch, getState) {
    try {
      const { auth: { token } } = getState();
      const ownerId = 1;                  //hard coded
      dispatch(packageRegisterRequest());

      const { data } = await axios.post(
        `${server}/packages/add`,
        { ownerId, name, duration, amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(packageRegisterSuccess(data));
    } catch (error) {
      dispatch(packageRegisterFailure(error.response.data.message));
    }
  };
};
