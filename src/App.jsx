import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import PrivateRoutes from "./components/PrivateRoutes";
import Packages from "./components/Packages";
import Members from "./components/Members";
import DashboardLayout from "./components/DashboardLayout";
import "./App.css";
import CustomerRegistration from "./components/CustomerRegistration";
import SignUp from "./components/SignUp";
import Inventory from "./components/Inventory";
import PaymentSuccessPage from "./components/PaymentSuccessPage";

function App() {

  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="packages" element={<Packages />} />
          <Route path="members" element={<Members />} />
          <Route path="customer-registration" element={<CustomerRegistration />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>

        {/* Add other protected routes here */}
      </Route>
      {/* Add public routes */}
    </Routes>
  );
}

export default App;
