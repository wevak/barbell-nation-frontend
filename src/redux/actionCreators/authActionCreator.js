import axios from "axios";
import { server } from "../store";
import { useNavigate } from "react-router-dom";

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
    // let navigate = useNavigate();
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
      )
       
    //    if(data?.jwt.length > 0) {
    //         debugger;
    //         // navigate("dashboard");
    //    }
       dispatch(userLoginSuccess(data));
    } catch (error) {
      dispatch(userLoginFailure(error.response.data.message));
    }
  };
};
