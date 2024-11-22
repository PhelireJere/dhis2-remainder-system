import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Asserts/sidebar";

// Importing the individual page components
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import Enroll from "./Components/Enrollment";
//import Appointments from "./pages/Appointments";
import Message from "./Components/message";
import Schedule from "./Components/Schedulling";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/registration" element={<Register />} />
            <Route path="/enroll" element={<Enroll />} />
            <Route path="/messaging" element={<Message />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App
