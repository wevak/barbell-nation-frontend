import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { userLogoutRequest } from "../redux/actionCreators/authActionCreator";
import axios from "axios";
import { server } from "../redux/store";
import logo from "../../assets/logo2.png"; 
import "./DashboardLayout.css"; 

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); 

  const { token, ownerId } = useSelector((state) => state.auth);

  const [gymName, setGymName] = useState("");
  const [email, setEmail] = useState("");

  const getOwnerById = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/owners/${ownerId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setGymName(data.gymName);
      setEmail(data.email);
    } catch (error) {
      console.error("Failed to fetch owner data:", error);
      
    }
  };

  useEffect(() => {
    getOwnerById();
  }, [token, ownerId]);

  const handleLogout = () => {
    dispatch(userLogoutRequest());
    navigate("/home");
  };

  const isActive = (path) => {

    return location.pathname.includes(path);
  };

  return (
    <div className="dashboard-layout">
    
      <aside className="dashboard-sidebar">
        
        
        <div className="admin-info">
          <img src={logo} alt="Barbell Nation Logo" className="sidebar-logo" />
          <h3>{gymName || "Loading..."}</h3>
          <p>{email || "Loading..."}</p>
        </div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li className={`sidebar-item ${isActive("/dashboard") && "active"}`}>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
            <li className={`sidebar-item ${isActive("packages") && "active"}`}>
              <Link to="packages" className="nav-link">
                Packages
              </Link>
            </li>
            <li className={`sidebar-item ${isActive("members") && "active"}`}>
              <Link to="members" className="nav-link">
                Members
              </Link>
            </li>
            <li className={`sidebar-item ${isActive("customer-registration") && "active"}`}>
              <Link to="customer-registration" className="nav-link">
                Registration
              </Link>
            </li>
            <li className={`sidebar-item ${isActive("inventory") && "active"}`}>
              <Link to="inventory" className="nav-link">
                Inventory
              </Link>
            </li>
          </ul>
        </nav>
        
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>
      
      
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}