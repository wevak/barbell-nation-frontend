import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userLogoutRequest } from "../redux/actionCreators/authActionCreator";
import axios from "axios";
import { server } from "../redux/store";

export default function DashboardLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, ownerId } = useSelector((state) => state.auth);

  const [gymName, setGymName] = useState("");
  const [email, setEmail] = useState("");

  const getOwnerById = async () => {
    const { data } = await axios.get(`${server}/owners/${ownerId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    setGymName(data.gymName);
    setEmail(data.email);
  };

  useEffect(() => {
    getOwnerById();
  }, []);

  const handleLogout = () => {
    dispatch(userLogoutRequest());
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="row dashboard-container">
        <aside className="col-4 sidebar" style={{ marginRight: 20 }}>
          <div className="admin-info">
            <div className="avatar"></div>
            <h3>{gymName}</h3>
            <p>{email}</p>
          </div>
          <nav className="menu">
            <ul className="nav flex-column">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/packages" className="nav-link">
                  Packages
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/members" className="nav-link">
                  Members
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/customer-registration" className="nav-link">
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/inventory" className="nav-link">
                  Inventory
                </Link>
              </li>
            </ul>
            {/* <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/packages">Packages</Link></li>
            <li><Link to="/members">Members</Link></li>
          </ul> */}
          </nav>
          <button className="btn btn-secondary logout" onClick={handleLogout}>
            Logout
          </button>
        </aside>
        <main className="col main-content">
          <Outlet /> {/* Renders the matched nested component */}
        </main>
      </div>
    </div>
  );
}
