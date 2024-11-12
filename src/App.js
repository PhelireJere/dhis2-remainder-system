import React from "react";
import Sidebar from "./Assets/Sidebar";
import Home from "./Components/Home/Home"

const App = () => {
  return (
    <div className="flex">
      <Sidebar />
      
        <Home/>
      
    </div>
  );
};

export default App;
