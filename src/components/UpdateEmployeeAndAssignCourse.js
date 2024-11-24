// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UpdateEmployeeAndAssignCourse = () => {
//     const [employeeDetails, setEmployeeDetails] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         jobTitle: "",
//         photographPath: "",
//         department: "",
//     });

//     const [originalDetails, setOriginalDetails] = useState({});
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) throw new Error("User not logged in");

//                 const response = await axios.get("http://localhost:8090/api/v1/faculty/details", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setEmployeeDetails(response.data);
//                 setOriginalDetails(response.data); // Store original details for reset
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch employee details");
//             }
//         };

//         fetchEmployeeDetails();
//     }, []);

//     const handleInputChange = (field, value) => {
//         setEmployeeDetails({ ...employeeDetails, [field]: value });
//     };

//     const resetField = (field) => {
//         setEmployeeDetails({ ...employeeDetails, [field]: originalDetails[field] });
//     };

//     const handleUpdate = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const { password, ...detailsToUpdate } = employeeDetails; // Exclude password

//             const response = await axios.put(
//                 "http://localhost:8090/api/v1/faculty/update",
//                 detailsToUpdate,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             alert("Details updated successfully!");
//             setOriginalDetails(response.data);
//         } catch (err) {
//             console.error(err);
//             alert("Failed to update details");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Employee Details</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form>
//                 <label>
//                     First Name:
//                     <input
//                         type="text"
//                         value={employeeDetails.firstName}
//                         onChange={(e) => handleInputChange("firstName", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("firstName")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Last Name:
//                     <input
//                         type="text"
//                         value={employeeDetails.lastName}
//                         onChange={(e) => handleInputChange("lastName", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("lastName")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Job Title:
//                     <input
//                         type="text"
//                         value={employeeDetails.jobTitle}
//                         onChange={(e) => handleInputChange("jobTitle", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("jobTitle")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Photograph Path:
//                     <input
//                         type="text"
//                         value={employeeDetails.photographPath}
//                         onChange={(e) => handleInputChange("photographPath", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("photographPath")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Department:
//                     <input
//                         type="text"
//                         value={employeeDetails.department}
//                         onChange={(e) => handleInputChange("department", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("department")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <button type="button" onClick={handleUpdate}>
//                     Update
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default UpdateEmployeeAndAssignCourse;



// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const UpdateEmployeeAndAssignCourse = () => {
//     const [employeeDetails, setEmployeeDetails] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         jobTitle: "",
//         photographPath: "",
//         department: "",
//     });
//     const [originalDetails, setOriginalDetails] = useState({});
//     const [courses, setCourses] = useState([]); // List of available courses
//     const [selectedCourse, setSelectedCourse] = useState(""); // Selected course for assignment
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchEmployeeDetails = async () => {
//             try {
//                 const token = localStorage.getItem("token");
//                 if (!token) throw new Error("User not logged in");

//                 const response = await axios.get("http://localhost:8090/api/v1/faculty/details", {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 setEmployeeDetails(response.data);
//                 setOriginalDetails(response.data); // Store original details for reset
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch employee details");
//             }
//         };

//         const fetchCourses = async () => {
//             try {
//                 const response = await axios.get("http://localhost:8090/api/v1/faculty/all-courses");
//                 setCourses(response.data); // Populate courses dropdown
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch courses");
//             }
//         };

//         fetchEmployeeDetails();
//         fetchCourses();
//     }, []);

//     const handleInputChange = (field, value) => {
//         setEmployeeDetails({ ...employeeDetails, [field]: value });
//     };

//     const resetField = (field) => {
//         setEmployeeDetails({ ...employeeDetails, [field]: originalDetails[field] });
//     };

//     const handleUpdate = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const { password, ...detailsToUpdate } = employeeDetails; // Exclude password

//             const response = await axios.put(
//                 "http://localhost:8090/api/v1/faculty/update",
//                 detailsToUpdate,
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             alert("Details updated successfully!");
//             setOriginalDetails(response.data);
//         } catch (err) {
//             console.error(err);
//             alert("Failed to update details");
//         }
//     };

//     const handleAssignCourse = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             if (!selectedCourse) {
//                 alert("Please select a course to assign.");
//                 return;
//             }

//             const response = await axios.put(
//                 "http://localhost:8090/api/v1/faculty/assign-course",
//                 { courseName: selectedCourse },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             alert("Course assigned successfully!");
//         } catch (err) {
//             console.error(err);
//             alert("Failed to assign course");
//         }
//     };

//     return (
//         <div>
//             <h2>Update Employee Details</h2>
//             {error && <p style={{ color: "red" }}>{error}</p>}
//             <form>
//                 <label>
//                     First Name:
//                     <input
//                         type="text"
//                         value={employeeDetails.firstName}
//                         onChange={(e) => handleInputChange("firstName", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("firstName")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Last Name:
//                     <input
//                         type="text"
//                         value={employeeDetails.lastName}
//                         onChange={(e) => handleInputChange("lastName", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("lastName")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Job Title:
//                     <input
//                         type="text"
//                         value={employeeDetails.jobTitle}
//                         onChange={(e) => handleInputChange("jobTitle", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("jobTitle")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Photograph Path:
//                     <input
//                         type="text"
//                         value={employeeDetails.photographPath}
//                         onChange={(e) => handleInputChange("photographPath", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("photographPath")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <label>
//                     Department:
//                     <input
//                         type="text"
//                         value={employeeDetails.department}
//                         onChange={(e) => handleInputChange("department", e.target.value)}
//                     />
//                     <button type="button" onClick={() => resetField("department")}>
//                         Reset
//                     </button>
//                 </label>
//                 <br />
//                 <button type="button" onClick={handleUpdate}>
//                     Update
//                 </button>
//             </form>

//             <h2>Assign Course</h2>
//             <label>
//                 Available Courses:
//                 <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
//                     <option value="">--Select a course--</option>
//                     {courses.map((course) => (
//                         <option key={course.courseCode} value={course.name}>
//                             {course.name}
//                         </option>
//                     ))}
//                 </select>
//             </label>
//             <button type="button" onClick={handleAssignCourse}>
//                 Assign Course
//             </button>
//         </div>
//     );
// };

// export default UpdateEmployeeAndAssignCourse;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./updateEmployeeAndAssignCourse.css"; 

const UpdateEmployeeAndAssignCourse = () => {
    const [employeeDetails, setEmployeeDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        jobTitle: "",
        photographPath: "",
        department: "",
    });
    const [originalDetails, setOriginalDetails] = useState({});
    const [courses, setCourses] = useState([]); // List of available courses
    const [selectedCourse, setSelectedCourse] = useState(""); // Selected course for assignment
    const [error, setError] = useState("");

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

        fetchEmployeeDetails();
        fetchCourses();
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
            const { password, ...detailsToUpdate } = employeeDetails; // Exclude password

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
        } catch (err) {
            console.error(err);
            alert("Failed to assign course");
        }
    };

    return (
        <div>
            <h2>Update Employee Details</h2>
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
                <br />
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
                <br />
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
                <br />
                <label>
                    Photograph Path:
                    <input
                        type="text"
                        value={employeeDetails.photographPath}
                        onChange={(e) => handleInputChange("photographPath", e.target.value)}
                    />
                    <button type="button" className="reset" onClick={() => resetField("photographPath")}>
                        Reset
                    </button>
                </label>
                <br />
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
                <br />
                <button type="button" className="update" onClick={handleUpdate}>
                    Update
                </button>
            </form>

            <div className="assign-course">
            <h2>Assign Course</h2>
            <label>
                Available Courses:
                <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)}>
                    <option value="">--Select a course--</option>
                    {courses.map((course) => (
                        <option key={course.courseCode} value={course.name}>
                            {course.name}
                        </option>
                    ))}
                </select>
            </label>
            <button type="button" onClick={handleAssignCourse}>
                Assign Course
            </button>
            </div>
        </div>
    );
};

export default UpdateEmployeeAndAssignCourse;

