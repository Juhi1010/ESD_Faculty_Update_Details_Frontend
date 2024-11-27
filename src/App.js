import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/LoginPage";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import UpdateEmployeeAndAssignCourse from "./components/MainPage/UpdateEmployeeAndAssignCourse";


function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<UpdateEmployeeAndAssignCourse />} />
      </Routes>
    </Router>
  );
}

export default App;





