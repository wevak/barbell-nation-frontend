import React from "react";
import "./Dashboard.css"; 

// You can use a library like react-icons for these icons or use custom SVG/images
import { FaEllipsisV, FaSearch, FaSortAmountDownAlt } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="dashboard-content">
      <header className="main-header">
        <h1 className="welcome-banner">Welcome Banner, Martell</h1>
        <p className="welcome-message">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </header>

      <section className="dashboard-grid">
        {/* Welcome Card - Now integrated into the main content area */}
        <div className="card welcome-card">
          <div className="welcome-image-placeholder"></div>
        </div>
        
        {/* Calendar Card */}
        <div className="card calendar-card">
          <h3>Calendar</h3>
          {/* Calendar component goes here */}
        </div>

        {/* Coaches Card */}
        <div className="card coaches-card">
          <div className="card-header">
            <h3>Coaches</h3>
            <FaEllipsisV className="card-options-icon" />
          </div>
          <ul className="coaches-list">
            <li>
              <div className="coach-profile-pic"></div>
              <span>Juan Dela Cruz</span>
            </li>
            <li>
              <div className="coach-profile-pic"></div>
              <span>Peter</span>
            </li>
            <li>
              <div className="coach-profile-pic"></div>
              <span>Peter</span>
            </li>
          </ul>
        </div>

        {/* Sales Card */}
        <div className="card sales-card">
          <div className="card-header">
            <h3>Sales</h3>
            <FaEllipsisV className="card-options-icon" />
          </div>
          <div className="sales-content">
            <div className="progress-circle">
              <svg viewBox="0 0 100 100">
                <circle className="bg" cx="50" cy="50" r="45"></circle>
                <circle className="progress" cx="50" cy="50" r="45" style={{ strokeDashoffset: 'calc(283 - (283 * 84) / 100)' }}></circle>
              </svg>
              <span className="progress-text">84%</span>
            </div>
          </div>
        </div>
        
        {/* Inventory Card */}
        <div className="card inventory-card">
          <h3>Inventory</h3>
          {/* Inventory component goes here */}
        </div>
      </section>

      {/* Active Members Table */}
      <div className="active-members-table card">
        <div className="card-header">
          <h3>Active Members</h3>
          <div className="table-controls">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <FaSearch className="search-icon" />
            </div>
            <div className="sort-by">
              <span>Sort by</span>
              <FaSortAmountDownAlt className="sort-icon" />
            </div>
          </div>
        </div>
        <div className="members-list">
          <div className="member-item">
            <div className="member-profile-pic"></div>
            <span className="member-name">James Medalla</span>
          </div>
          <div className="member-item">
            <div className="member-profile-pic"></div>
            <span className="member-name">Kent Charl Mabutas</span>
          </div>
          <div className="member-item">
            <div className="member-profile-pic"></div>
            <span className="member-name">John Elmar Rodrigo</span>
          </div>
        </div>
      </div>
    </div>
  );
}