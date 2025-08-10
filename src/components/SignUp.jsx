import React, { useState } from "react";
import logo from "../assets/FitnessLogo.png";
import { ownerRegisterAsync } from "../redux/actionCreators/authActionCreator";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [type, setGymType] = useState("");
  const [gymName, setGymName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    await dispatch(
      ownerRegisterAsync({
        name,
        email,
        phone,
        gender,
        type,
        gymName,
        password,
      })
    );
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <div className="form-box">
          <h2>Sign-up</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="phone">Phone*</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label htmlFor="gender">Gender*</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">--Select--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label htmlFor="type">Gym Type*</label>
            <input
              type="text"
              id="type"
              name="type"
              value={type}
              onChange={(e) => setGymType(e.target.value)}
              placeholder="e.g. Unisex, Cardio, Weightlifting"
              required
            />

            <label htmlFor="gymName">Gym Name*</label>
            <input
              type="text"
              id="gymName"
              name="gymName"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              required
            />

            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="register-btn"
              // onClick={handleRegister}
            >
              Register
            </button>
            <Link to="/login" className="mt-3 align-self-center">
              Already Registered, please login
            </Link>
          </form>
        </div>

        <div className="logo-box">
          <img src={logo} alt="Stamina Fitness Centre Logo" />
        </div>
      </div>
    </div>
  );
}
