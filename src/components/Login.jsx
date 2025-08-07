import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { userLoginAsync } from "../redux/actionCreators/authActionCreator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (isAuth.length > 0) {
      // debugger
      navigate("/dashboard");
    }
  }, [isAuth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(userLoginAsync(email, password));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div className="justify-content-center">
        <h2>Login Page</h2>
        <form>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
              id="emailInput"
              placeholder="email@example.com"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              className="mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <Outlet />
      </div>
    </div>
  );
}
