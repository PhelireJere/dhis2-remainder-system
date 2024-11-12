// Home.js
import React from "react";
import "./Home.css";

const Home = () => {
  // Example data - this would normally be fetched from an API or state management.
  const totalPatients = 120;
  const upcomingReminders = 15;
  const notifications = 5;

  return (
    <div className="home-container">
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="card-container">
        <div className="card">
          <div className="card-title">Total Patients</div>
          <div className="card-value">{totalPatients}</div>
        </div>
        <div className="card">
          <div className="card-title">Upcoming Reminders</div>
          <div className="card-value">{upcomingReminders}</div>
        </div>
        <div className="card">
          <div className="card-title">Notifications</div>
          <div className="card-value">{notifications}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
