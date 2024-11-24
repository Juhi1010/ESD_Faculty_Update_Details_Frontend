import React, { useState } from "react";
import axios from "axios";

const UpdateEmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    password: "",
    photographPath: "",
    department: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("token"); // Store token in localStorage or context
      const response = await axios.put(
        "http://localhost:8080/api/v1/faculty/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setMessage("Employee details updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Error updating employee details.");
    }
  };

  return (
    <div>
      <h2>Update Employee Details</h2>
      <form onSubmit={handleSubmit}>
        <input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
        <input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        <input name="photographPath" placeholder="Photograph Path" value={formData.photographPath} onChange={handleChange} />
        <input name="department" placeholder="Department ID" value={formData.department} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
      {message && <p>{message}</p>}

    </div>
  );
};

export default UpdateEmployeeForm;
