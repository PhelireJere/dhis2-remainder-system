import { Link } from "react-router-dom";
import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h1 className="text-2xl font-semibold">Patient Reminder</h1>
      </div>
      <nav className="sidebar-nav">
        
          <Link to="/">
              <button class="button">
              Dashboard
              </button>
          </Link>
          
          <Link to="/registration">
              <button className="button">
              Registration
              </button>
          </Link>
          <Link to="/Enroll">
              <button className="button">
              Enroll
              </button>
          </Link>
          <Link to="/messaging">
              <button className="button">
              Messaging
              </button>
          </Link>
          <Link to="/schedule">
              <button className="button">
              Appointment Schedule
              </button>
          </Link>
        
      </nav>
      <div className="footer">
        <p>© 2024 DHIS2 Reminder</p>
      </div>
    </div>
  );
};

export default Sidebar;
