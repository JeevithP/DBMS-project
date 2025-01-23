// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../redux/userSlice";
// import { ToastContainer, toast } from "react-toastify";
// import { Link } from "react-router-dom";  // Import Link from React Router
// import "react-toastify/dist/ReactToastify.css";

// const Home = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state?.user);
//   const [events, setEvents] = useState([]);
//   const [loadingEvents, setLoadingEvents] = useState(true);
//   const [registeringEventId, setRegisteringEventId] = useState(null);
//   const [selectedEvent, setSelectedEvent] = useState(null); 
//   const [showModal, setShowModal] = useState(false); // For modal visibility

//   const fetchUserDetails = async () => {
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/profile`;
//       const response = await axios.get(URL, { withCredentials: true });
//       dispatch(setUser(response.data.student));
//     } catch (error) {
//       console.log("Error fetching user details:", error);
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/get-events`;
//       const response = await axios.get(URL, { withCredentials: true });
//       setEvents(response.data.data);
//       setLoadingEvents(false);
//     } catch (error) {
//       console.log("Error fetching events:", error);
//       setLoadingEvents(false);
//     }
//   };

//   const registerForEvent = async (eventId) => {
//     setRegisteringEventId(eventId);
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/register-event`;
//       const response = await axios.post(
//         URL,
//         { event_id: eventId },
//         { withCredentials: true }
//       );

//       toast.success(response.data.message, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       setEvents(events.filter((event) => event.eid !== eventId));
//     } catch (error) {
//       console.error("Error registering for event:", error);
//       toast.error("Failed to register for the event. Please try again.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } finally {
//       setRegisteringEventId(null);
//       setShowModal(false); // Close the modal after registration
//     }
//   };

//   const handleConfirmRegister = () => {
//     registerForEvent(selectedEvent);
//   };

//   const handleCancelRegister = () => {
//     setShowModal(false); // Close the modal if cancelled
//     setSelectedEvent(null);
//   };

//   useEffect(() => {
//     fetchUserDetails();
//     fetchEvents();
//   }, []);

//   if (!user) {
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
//         {/* Student Profile Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//           <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
//           <p>
//             <strong>Name:</strong> {user.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>USN:</strong> {user.usn}
//           </p>
//           <p>
//             <strong>Department:</strong> {user.department_id}
//           </p>
//           <p>
//             <strong>Counsellor:</strong> {user.counsellor_id || "Not Assigned"}
//           </p>
//         </div>

//         {/* Button to navigate to Student Events Page */}
//         <div className="mb-6">
//           <Link
//             to="/api/v1/student/get-events"  // Navigate to the events page
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//           >
//             View Events and Points
//           </Link>
//         </div>

//         {/* Events Section */}
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h1 className="text-2xl font-bold mb-4">Available Events</h1>
//           {loadingEvents ? (
//             <p>Loading events...</p>
//           ) : events.length === 0 ? (
//             <p>No events available</p>
//           ) : (
//             <table className="table-auto w-full border-collapse border border-gray-200">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border border-gray-300 p-2">Event ID</th>
//                   <th className="border border-gray-300 p-2">Event Name</th>
//                   <th className="border border-gray-300 p-2">Points</th>
//                   <th className="border border-gray-300 p-2">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {events.map((event) => (
//                   <tr key={event.eid} className="hover:bg-gray-50">
//                     <td className="border border-gray-300 p-2 text-center">
//                       {event.eid}
//                     </td>
//                     <td className="border border-gray-300 p-2">{event.name}</td>
//                     <td className="border border-gray-300 p-2">{event.points}</td>
//                     <td className="border border-gray-300 p-2 text-center">
//                       <button
//                         onClick={() => {
//                           setSelectedEvent(event.eid);
//                           setShowModal(true); // Show the modal on button click
//                         }}
//                         className={`px-4 py-2 text-white font-semibold rounded-lg ${
//                           registeringEventId === event.eid
//                             ? "bg-blue-400 cursor-not-allowed"
//                             : "bg-blue-500 hover:bg-blue-600"
//                         }`}
//                         disabled={registeringEventId === event.eid}
//                       >
//                         {registeringEventId === event.eid
//                           ? "Registering..."
//                           : "Register"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* Confirmation Modal */}
//         {showModal && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//               <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
//               <p>Do you want to register for this event?</p>
//               <div className="mt-4 flex justify-between">
//                 <button
//                   onClick={handleCancelRegister}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleConfirmRegister}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//                 >
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { format } from 'date-fns';

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [registeringEventId, setRegisteringEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); 
  const [showModal, setShowModal] = useState(false); 

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/profile`;
      const response = await axios.get(URL, { withCredentials: true });
      dispatch(setUser(response.data.students));
      console.log(response.data.students)
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/get-events`;
      const response = await axios.get(URL, { withCredentials: true });
      setEvents(response.data.data);
      console.log(response.data.data)
      setLoadingEvents(false);
    } catch (error) {
      console.log("Error fetching events:", error);
      setLoadingEvents(false);
    }
  };

  const registerForEvent = async (eventId) => {
    setRegisteringEventId(eventId);
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/register-event`;
      const response = await axios.post(
        URL,
        { event_id: eventId },
        { withCredentials: true }
      );
      
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
      });
      setEvents(events.filter((event) => event.eid !== eventId));
    } catch (error) {
      console.error("Error registering for event:", error);
      toast.error("Failed to register for the event. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setRegisteringEventId(null);
      setShowModal(false); // Close the modal after registration
    }
  };

  const handleConfirmRegister = () => {
    registerForEvent(selectedEvent);
  };

  const handleCancelRegister = () => {
    setShowModal(false); // Close the modal if cancelled
    setSelectedEvent(null);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchEvents();
  }, []);

  if (!user) {
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
        {/* Student Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>USN:</strong> {user.usn}
          </p>
          <p>
            <strong>Department:</strong> {user.department_name}
          </p>
          <p>
            <strong>Counsellor:</strong> {user.counsellor_name}
          </p>
        </div>

        {/* Button to navigate to Student Events Page */}
        <div className="mb-6">
          <Link
            to="/api/v1/student/get-events"  // Navigate to the events page
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            View Events and Points
          </Link>
        </div>

        {/* Events Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Available Events</h1>
          {loadingEvents ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p>No events available</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Event Name</th>
                  <th className="border border-gray-300 p-2">Event Description</th>
                  <th className="border border-gray-300 p-2">Points</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.eid} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 text-center">
                      {event.name}
                    </td>
                    <td className="border border-gray-300 p-2">{event.description}</td>
                    <td className="border border-gray-300 p-2">{event.points}</td>
                    <td className="border border-gray-300 p-2">{event.event_date}</td> 
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedEvent(event.eid);
                          setShowModal(true); // Show the modal on button click
                        }}
                        className={`px-4 py-2 text-white font-semibold rounded-lg ${
                          registeringEventId === event.eid
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                        disabled={registeringEventId === event.eid}
                      >
                        {registeringEventId === event.eid
                          ? "Registering..."
                          : "Register"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
              <p>Do you want to register for this event?</p>
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleCancelRegister}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRegister}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;