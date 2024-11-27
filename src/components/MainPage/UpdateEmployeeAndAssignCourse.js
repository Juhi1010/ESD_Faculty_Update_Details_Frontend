import React, { useState, useEffect } from "react";
import axios from "axios";
import "./updateEmployeeAndAssignCourse.css";

const UpdateEmployeeAndAssignCourse = () => {
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    jobTitle: "",
    department: "",
  });
  const [originalDetails, setOriginalDetails] = useState({});
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [error, setError] = useState("");
  const [employeeId, setEmployeeId] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  // Fetch employee details and available courses

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const response = await axios.get("http://localhost:8090/api/v1/faculty/details", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployeeDetails(response.data);
        setOriginalDetails(response.data); // Store original details for reset
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employee details");
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:8090/api/v1/courses");
        setCourses(response.data); // Populate courses dropdown with names
      } catch (err) {
        console.error(err);
        setError("Failed to fetch courses");
      }
    };

    const fetchRegisteredCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const response = await fetch("http://localhost:8090/api/v1/faculty/registered-courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const courses = await response.json();
          setRegisteredCourses(courses); // courses should include courseCode and name
        } else {
          alert("Failed to fetch registered courses");
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchEmployeeId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not logged in");

        const response = await axios.get("http://localhost:8090/api/v1/faculty/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEmployeeId(response.data.employeeId);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch employee ID");
      }
    };

    fetchEmployeeDetails();
    fetchCourses();
    fetchRegisteredCourses();
    fetchEmployeeId();
  }, []);

  const handleInputChange = (field, value) => {
    setEmployeeDetails({ ...employeeDetails, [field]: value });
  };

  const resetField = (field) => {
    setEmployeeDetails({ ...employeeDetails, [field]: originalDetails[field] });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      const { photographPath, ...detailsToUpdate } = employeeDetails; // Exclude photographPath

      const response = await axios.put(
        "http://localhost:8090/api/v1/faculty/update",
        detailsToUpdate,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Details updated successfully!");
      setOriginalDetails(response.data);
    } catch (err) {
      console.error(err);
      alert("Failed to update details");
    }
  };

  const handleAssignCourse = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!selectedCourse) {
        alert("Please select a course to assign.");
        return;
      }

      const response = await axios.put(
        "http://localhost:8090/api/v1/faculty/assign-course",
        { courseName: selectedCourse }, // Send course name in the request body
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Course assigned successfully!");
      setRegisteredCourses([...registeredCourses, selectedCourse]); // Update registered courses list
    } catch (err) {
      console.error(err);
      alert("Failed to assign course");
    }
  };

  const handleRemoveCourse = async (courseName) => {
    try {
        const token = localStorage.getItem("token");
        if (!employeeId || !courseName) {
            alert("Missing employee ID or course name");
            return;
        }

        const response = await axios.delete(`http://localhost:8090/api/v1/faculty/remove-course`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { employeeId, courseName }, // Send courseName and employeeId
        });

        if (response.status === 200) {
            setRegisteredCourses((prevCourses) =>
                prevCourses.filter((course) => course.name !== courseName)
            );
            alert("Course removed successfully!");
        }
    } catch (err) {
        console.error(err);
        alert("Failed to remove course");
    }
  };


    const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file || !employeeId) {
        alert("No file selected or employee ID missing!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const token = localStorage.getItem("token");
        await axios.post(
            `http://localhost:8090/api/v1/faculty/${employeeId}/upload-image`,
            formData,
            {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
            }
        );
        alert("Image uploaded successfully!");
    } catch (err) {
        console.error(err);
        alert("Failed to upload image");
    }
   };


  return (
    <div>
      <h2>Employee Details</h2>
      <hr />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="image-container">
        {employeeDetails.photographPath ? (
          <img
            src={`http://localhost:8090/api/v1/faculty/images/${employeeDetails.photographPath}`}
            alt="Employee"
            className="employee-image"
          />
        ) : (
          <p>No image available</p>
        )}
      </div>

      <h2>Update Employee Details</h2>
      <hr />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form>
        <label>
          First Name:
          <input
            type="text"
            value={employeeDetails.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
          <button type="button" className="reset" onClick={() => resetField("firstName")}>
            Reset
          </button>
        </label>

        <label>
          Last Name:
          <input
            type="text"
            value={employeeDetails.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
          <button type="button" className="reset" onClick={() => resetField("lastName")}>
            Reset
          </button>
        </label>

        <label>
          Job Title:
          <input
            type="text"
            value={employeeDetails.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
          />
          <button type="button" className="reset" onClick={() => resetField("jobTitle")}>
            Reset
          </button>
        </label>

        <div className="inline-fields">
          <label>
            Department:
            <input
              type="text"
              value={employeeDetails.department}
              onChange={(e) => handleInputChange("department", e.target.value)}
            />
            <button type="button" className="reset" onClick={() => resetField("department")}>
              Reset
            </button>
          </label>

        </div>

        <button type="button" className="update" onClick={handleUpdate}>
          Update
        </button>
      </form>

      
        <h2>Upload Employee Photo</h2>
        <hr />
      <div className="image-upload">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>


    <div className="registered-courses">
        <h2>Registered Courses</h2>
        <hr />
        {registeredCourses.length > 0 ? (
            <ul className="courses-list">
                {registeredCourses.map((course, index) => (
                    <li key={index} className="course-item">
                        <span className="course-name">{course}</span>
                        <button
                            className="close-button"
                            onClick={() => handleRemoveCourse(course)}
                        >
                            X
                        </button>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="no-courses">No registered courses found.</p>
        )}
    </div>
        
      <h2>Assign New Course</h2>
      <hr />
      <div className="assign-course">
      <select onChange={(e) => setSelectedCourse(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course.courseCode} value={course.name}>
            {course.name}
          </option>
        ))}
      </select>
      <button type="button" onClick={handleAssignCourse}>
        Assign
      </button>
    </div>
  </div>

 ); 
};

export default UpdateEmployeeAndAssignCourse;



