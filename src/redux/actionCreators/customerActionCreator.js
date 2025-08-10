import axios from "axios";
import { server } from "../store";

export const customerRegisterRequest = () => {
  return {
    type: "CUSTOMER_REGISTER_REQUEST",
  };
};

export const customerRegisterSuccess = (data) => {
  return {
    type: "CUSTOMER_REGISTER_SUCCESS",
    payload: data,
  };
};

export const customerRegisterFailure = (message) => {
  return {
    type: "CUSTOMER_REGISTER_FAILURE",
    message,
  };
};

export const customerRegisterAsync = ({ name, email, gender, phone, packageId }) => {
  return async function (dispatch) {
    try {
      dispatch(customerRegisterRequest());

      const { data } = await axios.post(
        `${server}/customers/add`,
        { name, email, gender, phone, packageId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(customerRegisterSuccess(data));
    } catch (error) {
      dispatch(customerRegisterFailure(error?.response?.data?.message));
    }
  };
};