// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setCounsellor, logoutCounsellor } from "../redux/counsellorSlice";
// import { ToastContainer, toast } from "react-toastify";
// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";

// const CounsellorHome = () => {
//   const dispatch = useDispatch();
//   const counsellor = useSelector((state) => state?.counsellor);
//   const [students, setStudents] = useState([]);
//   const [department, setDepartment] = useState("");
//   const [loadingStudents, setLoadingStudents] = useState(true);

//   const fetchCounsellorDetails = async () => {
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/profile`;
//       const response = await axios.get(URL, { withCredentials: true });
//       console.log(response.data)
//       dispatch(setCounsellor(response.data.counsellor));
//     //   console.log(response.data.students)
//       setStudents(response.data.student_points);
//       setDepartment(response.data.department);
//       setLoadingStudents(false);
//     } catch (error) {
//       console.log("Error fetching counsellor details:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCounsellorDetails();
//   }, []);

//   if (!counsellor) {
//     return (
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           height: "100vh",
//           fontFamily: "Arial, sans-serif",
//           color: "#555",
//           backgroundColor: "#f5f6fa",
//           fontSize: "20px",
//         }}
//       >
//         <p>Loading profile...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto">
//         <ToastContainer />
//         {/* Counsellor Profile Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h1 className="text-2xl font-bold mb-4">Counsellor Profile</h1>
//           <p>
//             <strong>Name:</strong> {counsellor.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {counsellor.email}
//           </p>
//           <p>
//             <strong>Department:</strong> {department.name}
//           </p>
//         </div>

//         {/* Button to navigate to Students List */}
//         <div className="mb-6">
//           <Link
//             to="/api/v1/counsellor/students"
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             View Assigned Students
//           </Link>
//         </div>

//         {/* {/* Students Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold mb-4">Assigned Students</h1>
//           {loadingStudents ? (
//             <p>Loading students...</p>
//           ) : students.length === 0 ? (
//             <p>No students assigned</p>
//           ) : (
//             <table className="table-auto w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 p-2">USN</th>
//                   <th className="border border-gray-300 p-2">Name</th>
//                   <th className="border border-gray-300 p-2">Email</th>
//                   <th className="border border-gray-300 p-2">Department</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student) => (
//                   <tr key={student.sid} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 p-2 text-center">
//                       {student.usn}
//                     </td>
//                     <td className="border border-gray-300 p-2">{student.name}</td>
//                     <td className="border border-gray-300 p-2">{student.email}</td>
//                     <td className="border border-gray-300 p-2">{student.department_id}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div> 
      

//       </div>
//     </div>
//   );
// };

// export default CounsellorHome;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCounsellor } from "../redux/counsellorSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CounsellorHome = () => {
  const dispatch = useDispatch();
  const counsellor = useSelector((state) => state?.counsellor);
  const [students, setStudents] = useState([]);
  const [department, setDepartment] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(true);

  const fetchCounsellorDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/profile`;
      const response = await axios.get(URL, { withCredentials: true });
      dispatch(setCounsellor(response.data.counsellor));
      setDepartment(response.data.department);
    //   console.log(response.data.students)      
    if (response.data.students && Array.isArray(response.data.students)) {
        setStudents(response.data.students);
      } else {
        console.error("student_points is not an array or doesn't exist.");
      };
    //   console.log(students)
      setLoadingStudents(false);
    } catch (error) {
      console.log("Error fetching counsellor details:", error);
    }
  };

  useEffect(() => {
    fetchCounsellorDetails();
  }, []);

  if (!counsellor) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "Arial, sans-serif",
          color: "#555",
          backgroundColor: "#f5f6fa",
          fontSize: "20px",
        }}
      >
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <ToastContainer />
        {/* Counsellor Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">Counsellor Profile</h1>
          <p>
            <strong>Name:</strong> {counsellor.name}
          </p>
          <p>
            <strong>Email:</strong> {counsellor.email}
          </p>
          <p>
            <strong>Department:</strong> {counsellor.department}
          </p>
        </div>

       

        {/* Students Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Assigned Students</h1>
          {loadingStudents ? (
            <p>Loading students...</p>
          ) : students.length === 0 ? (
            <p>No students assigned</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">USN</th>
                  <th className="border border-gray-300 p-2">Name</th>
                  <th className="border border-gray-300 p-2">Email</th>
                  <th className="border border-gray-300 p-2">Department</th>
                  <th className="border border-gray-300 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.student_id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 text-center">
                      {student.usn}
                    </td>
                    <td className="border border-gray-300 p-2">{student.name}</td>
                    <td className="border border-gray-300 p-2">{student.email}</td>
                    <td className="border border-gray-300 p-2">{student.department}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <Link
                        to={`/api/v1/counsellor/students/${student.student_id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        View Student Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default CounsellorHome;
