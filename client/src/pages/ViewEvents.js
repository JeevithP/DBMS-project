// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { setUser } from "../redux/userSlice";

// const StudentEvents = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state?.user);
//   const [events, setEvents] = useState([]);
//   const [totalPoints, setTotalPoints] = useState(0);
//   const [loading, setLoading] = useState(true);

//   const fetchUserDetails = async () => {
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/profile`;
//       const response = await axios.get(URL, { withCredentials: true });
//       dispatch(setUser(response.data.student));
//     } catch (error) {
//       console.log("Error fetching user details:", error);
//     }
//   };
//   // Fetch student's events and total points
//   const fetchStudentEvents = async () => {
//     console.log(user)
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/get-events-by-id`;
//       const response = await axios.post(URL, 
//        { studentID: user.sid},
//        { withCredentials: true }  // Assuming `user.sid` holds the student ID
//       );
      
//       setEvents(response.data.events);
//       setTotalPoints(response.data.totalPoints);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       toast.error("Failed to load events", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       setLoading(false);
//     }
//   };


//   useEffect(() => {
//     fetchUserDetails();
//     fetchStudentEvents();
//   }, []);

//   if (loading) {
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
//         <p>Loading events...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="container mx-auto">
//         <ToastContainer />
//         {/* Student Events Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h1 className="text-2xl font-bold mb-4">Student Events</h1>

//           <p className="mb-4">
//             <strong>Total Activity Points:</strong> {totalPoints}
//           </p>

//           {events.length === 0 ? (
//             <p>No events participated in yet.</p>
//           ) : (
//             <table className="table-auto w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 p-2">Event Name</th>
//                   <th className="border border-gray-300 p-2">Points</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {events.map((event) => (
//                   <tr key={event.event_id} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 p-2">{event.name}</td>
//                     <td className="border border-gray-300 p-2">{event.points}</td>
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

// export default StudentEvents;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../redux/userSlice";

const StudentEvents = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const [events, setEvents] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  // Function to fetch user details from API and dispatch to Redux store
  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/profile`;
      const response = await axios.get(URL, { withCredentials: true });
      dispatch(setUser(response.data.student));
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  // Fetch student's events and total points
  const fetchStudentEvents = async () => {
    if (!user) return; // If user is not available, return early

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/get-events-by-id`;
      const response = await axios.post(
        URL,
        { studentID: user.sid },
        { withCredentials: true } // Assuming `user.sid` holds the student ID
      );

      setEvents(response.data.events);
      setTotalPoints(response.data.totalPoints);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events", {
        position: "top-right",
        autoClose: 3000,
      });
      setLoading(false);
    }
  };

  // Ensure user data is fetched on page load
  useEffect(() => {
    fetchUserDetails();
  }, []); // Fetch user details only once when the component mounts

  // Fetch events once the user data is available
  useEffect(() => {
    if (user) {
      fetchStudentEvents();
    }
  }, []); // Dependency on 'user' to ensure events are fetched after user data is available

  // Show loading indicator until user data is fetched
  if (loading) {
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
        <p>Loading events...</p>
      </div>
    );
  }

  // Render the events page once the data is available
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <ToastContainer />
        {/* Student Events Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">Student Events</h1>

          <p className="mb-4">
            <strong>Total Activity Points:</strong> {totalPoints}
          </p>

          {events.length === 0 ? (
            <p>No events participated in yet.</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Event Name</th>
                  <th className="border border-gray-300 p-2">Points</th>
                  <th className="border border-gray-300 p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.event_id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{event.name}</td>
                    <td className="border border-gray-300 p-2">{event.points}</td>
                    <td className="border border-gray-300 p-2">{event.event_date}</td>
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

export default StudentEvents;


