import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userLoginAsync } from "../redux/actionCreators/authActionCreator";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (isAuth.length > 0) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(userLoginAsync(email, password));
  };

  return (
    // Replaced inline style with a class from your CSS
    <div className="login-body">
      {/* Replaced 'justify-content-center' with a class from your CSS */}
      <div className="login-container"  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Your HTML structure goes here. I've added a wrapper div for a clean look. */}
        <div className="login-box">
          <div className="login-form">
            <h2>Login Page</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // The mb-3 class is not in your CSS. Let's rely on your CSS rules.
                  id="emailInput"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  // The mb-3 class is not in your CSS.
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                // The btn btn-primary classes are not in your CSS.
                // Replaced with 'login-form button' and the CSS selector
                // will target it.
              >
                Login
              </button>
              <Link to="/signup" className="mt-3 align-self-center">
                Register
              </Link>
            </form>
        <Outlet />
      </div>
          </div>
          <img src="src/assets/logo2.png" alt="Barbell Nation Logo" style={{ height: '400px', width: '400px' }} />
        </div>
    </div>
  );
}