import React, { useEffect } from "react";
import "./App.css";
import { Outlet, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import { useSelector } from "react-redux";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  const { token } = useSelector((state) => state.auth);
  // debugger;

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other protected routes here */}
      </Route>
      {/* Add public routes */}
    </Routes>
    // </Router>
  );
}

export default App;
