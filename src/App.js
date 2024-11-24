import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AssignCourseForm from "./components/AssignCourseForm";
import UpdateEmployeeForm from "./components/UpdateEmployeeForm";
import UpdateEmployeeAndAssignCourse from "./components/UpdateEmployeeAndAssignCourse";


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

