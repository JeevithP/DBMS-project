// import React, { useEffect } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { setClubUser } from "../redux/clubUserSlice";
// import { setEvents } from "../redux/clubEventsSlice";

// const ClubEvents = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const club = useSelector((state) => state.clubUser);
//   const events = useSelector((state) => state.clubEvents.events);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/profile`;
//         const response = await axios.get(URL, { withCredentials: true });
//         console.log(response)
//         if (response.data.success) {
//           dispatch(setClubUser(response.data.club));
//           dispatch(setEvents(response.data.events));
//         } else {
//           toast.error("Failed to load profile");
//         }
//       } catch (error) {
//         toast.error("Error fetching profile data.");
//       }
//     };

//     fetchProfile();
//   }, [dispatch]);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <ToastContainer />
//       {club.name ? (
//         <div className="container mx-auto">
//           {/* Club Profile */}
//           <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//             <h1 className="text-2xl font-bold mb-4 text-center">Club Profile</h1>
//             <p>
//               <strong>Name:</strong> {club.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {club.email}
//             </p>
//           </div>

//           {/* Events Section */}
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <div className="flex justify-between items-center mb-4">
//               <h1 className="text-2xl font-bold">Events</h1>
//               <div className="flex gap-4">
//                 <button
//                   onClick={() => navigate("/api/v1/club/add-event")}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
//                 >
//                   Add Event
//                 </button>
//                 {/* <button
//                   onClick={() => navigate("/api/v1/club/delete-event")}
//                   className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//                 >
//                   Delete Event
//                 </button> */}
//               </div>
//             </div>
//             {events.length > 0 ? (
//               <ul>
//                 {events.map((event) => (
//                   <li key={event.eid} className="mb-4">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <strong>{event.name}</strong> - {event.description}<strong> - {event.event_date}</strong>
//                       </div>
//                       <button
//                         onClick={() => navigate(`/api/v1/club/event/${event.eid}`)}
//                         className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                       >
//                         Manage Students
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600">No events available</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading club profile...</p>
//       )}
//     </div>
//   );
// };

// export default ClubEvents;

import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setClubUser } from '../redux/clubUserSlice';
import { setEvents } from '../redux/clubEventsSlice';

const ClubEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const club = useSelector((state) => state.clubUser);
  const events = useSelector((state) => state.clubEvents.events);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/profile`;
        const response = await axios.get(URL, { withCredentials: true });
        if (response.data.success) {
          dispatch(setClubUser(response.data.club));
          dispatch(setEvents(response.data.events));
        } else {
          toast.error("Failed to load profile");
        }
      } catch (error) {
        toast.error("Error fetching profile data.");
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans"> 
      <ToastContainer />
      {club.name ? (
        <div className="container mx-auto">
          {/* Club Profile */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Club Profile</h1>
            <p>
              <span className="font-semibold">Name:</span> {club.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {club.email}
            </p>
          </div>

          {/* Events Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Events</h1>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => navigate("/api/v1/club/add-event")}
              >
                Add Event
              </button>
            </div>
            {events.length > 0 ? (
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr>
                    <th className="border border-gray-200 p-2">Event Name</th>
                    <th className="border border-gray-200 p-2">Description</th>
                    <th className="border border-gray-200 p-2">Date</th>
                    <th className="border border-gray-200 p-2 text-center">Actions</th> 
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.eid}>
                      <td className="border border-gray-200 p-2">{event.name}</td>
                      <td className="border border-gray-200 p-2">{event.description}</td>
                      <td className="border border-gray-200 p-2">{event.event_date}</td>
                      <td className="border border-gray-200 p-2 text-center"> 
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
                          onClick={() => navigate(`/api/v1/club/event/${event.eid}`)}
                        >
                          Manage Students
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-600">No events available</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading club profile...</p>
      )}
    </div>
  );
};

export default ClubEvents;