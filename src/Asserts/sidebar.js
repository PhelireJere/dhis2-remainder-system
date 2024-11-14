import React from "react";
import { Link } from "react-router-dom";
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
            <Link to="/">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/registration">Registration</Link>
          </li>
          <li className="nav-item">
            <Link to="/enroll">Enroll</Link>
          </li>

          <li className="nav-item">
            <Link to="/messaging">Messaging</Link>
          </li>
          <li className="nav-item">
            <Link to="/schedule">Appointment Schedule</Link>
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
