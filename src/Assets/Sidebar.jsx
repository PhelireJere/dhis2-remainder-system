
// Sidebar.js
import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="text-2xl font-semibold">Patient Reminder</h1>
      </div>
      <nav className="sidebar-nav">
        <ul className="space-y-4">
          <li className="nav-item">
            <span>Dashboard</span>
          </li>
          <li className="nav-item">
            <span>Regstration</span>
          </li>
          <li className="nav-item">
            <span>Enroll</span>
          </li>
          <li className="nav-item">
            <span>Appointments</span>
          </li>
          <li className="nav-item">
            <span>messaging</span>
          </li>
          <li className="nav-item">
            <span>appointment schedure</span>
          </li>
        </ul>
      </nav>
      <div className="footer">
        <p>© 2024 DHIS2 Reminder</p>
      </div>
    </div>
  );
};

export default Sidebar;
