import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { userLogoutRequest } from "../redux/actionCreators/authActionCreator";

export default function DashboardLayout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {

  },[])

  const handleLogout = () => {
    dispatch(userLogoutRequest());
    navigate("/login");
  }

  return (
    <div className="container">
      <div className="row dashboard-container">
        <aside className="col-4 sidebar" style={{ marginRight: 20 }}>
          <div className="admin-info">
            <div className="avatar"></div>
            <h3>Administrator Name</h3>
            <p>email@gmail.com</p>
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
          <button className="btn btn-secondary logout" onClick={handleLogout}>Logout</button>
        </aside>
        <main className="col main-content">
          <Outlet /> {/* Renders the matched nested component */}
        </main>
      </div>
    </div>
  );
}
