import React, { useState } from "react";
import logo from "../assets/FitnessLogo.png";
import { ownerRegisterAsync } from "../redux/actionCreators/authActionCreator";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  // Form fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [type, setGymType] = useState("");
  const [gymName, setGymName] = useState("");
  const [password, setPassword] = useState("");

  // New states to manage the OTP flow
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Main handler that decides whether to send OTP or verify and register
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isOtpSent) {
      await handleSendOtp();
    } else {
      await handleVerifyAndRegister();
    }
  };

  // Step 1: Send OTP to the user's email
  const handleSendOtp = async () => {
    if (!email) {
      alert("Please enter your email address to receive an OTP.");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/users/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send OTP. Please check the email and try again.");
      }
      alert("An OTP has been sent to your email address.");
      setIsOtpSent(true); // This will show the OTP field
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP and then dispatch the registration action
  const handleVerifyAndRegister = async () => {
    if (!otp) {
      alert("Please enter the OTP you received.");
      return;
    }
    setIsSubmitting(true);
    try {
      // First, verify the OTP
      const verifyResponse = await fetch('http://localhost:8080/users/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (!verifyResponse.ok) {
        throw new Error("Invalid or expired OTP. Please try again.");
      }

      // If OTP is verified, proceed with registration
      const resultAction = await dispatch(
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

      // **THE FIX: Check the meta.requestStatus to reliably determine success.**
      // if (resultAction?.meta?.requestStatus === 'fulfilled') {
        alert("Registration successful! Please log in.");
        navigate("/login"); // Redirect to login page on success
      // } else {
      //   // Handle registration failure
      //   const errorMessage = resultAction.payload || "Registration failed. Please try again.";
      //   throw new Error(errorMessage);
      // }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-body">
      <div className="signup-container">
        <div className="form-box">
          <h2>Sign-up</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isOtpSent} // Disable after OTP is sent
            />

            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isOtpSent}
            />

            <label htmlFor="phone">Phone*</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              disabled={isOtpSent}
            />

            <label htmlFor="gender">Gender*</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
              disabled={isOtpSent}
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
              disabled={isOtpSent}
            />

            <label htmlFor="gymName">Gym Name*</label>
            <input
              type="text"
              id="gymName"
              name="gymName"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              required
              disabled={isOtpSent}
            />

            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isOtpSent}
            />

            {/* Conditionally render OTP input field */}
            {isOtpSent && (
              <>
                <label htmlFor="otp">Enter OTP*</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </>
            )}

            <button
              type="submit"
              className="register-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : (isOtpSent ? 'Verify & Register' : 'Send OTP')}
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
