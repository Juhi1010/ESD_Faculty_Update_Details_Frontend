import React, { useState, useEffect } from "react";
import axios from "axios";

const AssignCourseForm = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [message, setMessage] = useState("");

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/v1/courses", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCourses(response.data); // Assuming backend returns an array of courses
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:8080/api/v1/faculty/assign-course",
        { courseName: selectedCourseId }, // Assuming backend maps this by name
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setMessage("Course assigned successfully!");
    } catch (error) {
      console.error("Error assigning course", error);
      setMessage("Error assigning course.");
    }
  };

  return (
    <div>
      <h2>Assign Course</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="course">Select a Course:</label>
        <select
          id="course"
          name="course"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.courseId} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
        <button type="submit" disabled={!selectedCourseId}>
          Assign Course
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignCourseForm;
