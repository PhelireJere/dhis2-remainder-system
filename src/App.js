import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import Sidebar from "./Asserts/sidebar";

// Importing the individual page components
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Register";
import Enroll from "./Components/Enrollment";
import Schedulling from './Components/scheduling/Schedulling';;
import Message from "./Components/message";

=======
import Sidebar from "./Assets/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Register from "./Components/Register/Register";
import Enroll from "./Components/Enrollment/Enrollment";
import Message from "./Components/message";
import Schedule from "./Components/Schedulling";
import RegisteredPatients from "./Components/RegisteredList/RegisteredList"
import PatientList from "./Components/PatientList/PatientList";
>>>>>>> 11669fd0d7c88f5ba3181406ee538eecc8c81223

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
<<<<<<< HEAD
            <Route path="/Schedullling" element={<Schedulling />} />
=======
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/registeredlist" element={ <RegisteredPatients/>}/>
            <Route path="/patientlist" element={ <PatientList/>}/>
>>>>>>> 11669fd0d7c88f5ba3181406ee538eecc8c81223
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
