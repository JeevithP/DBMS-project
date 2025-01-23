// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { addEvent } from "../redux/clubEventsSlice";
// import { useNavigate } from "react-router-dom";

// const AddEvent = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [points, setPoints] = useState("");
//   const [description, setDescription] = useState("");
//   const dispatch = useDispatch();

//   const handleAddEvent = async (e) => {
//     e.preventDefault();
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/add-event`;
//       const response = await axios.post(
//         URL,
//         { name, points, description },
//         { withCredentials: true }
//       );
//       if (response.data.success) {
//         dispatch(addEvent({ name, points, description }));
//         toast.success("Event added successfully!");
//         setTimeout(() => {
//           navigate('/api/v1/club/profile', {
//             state: response?.data?.data,
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add event.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <ToastContainer />
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Add New Event
//         </h1>
//         <form onSubmit={handleAddEvent}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//               Event Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter event name"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="points" className="block text-gray-700 font-medium mb-2">
//               Event Points
//             </label>
//             <input
//               id="points"
//               type="number"
//               value={points}
//               onChange={(e) => setPoints(e.target.value)}
//               placeholder="Enter event points"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Event Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter event description"
//               rows="4"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             ></textarea>
//           </div>

//           <div className="flex items-center justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             >
//               Add Event
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setName("");
//                 setPoints("");
//                 setDescription("");
//               }}
//               className="bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEvent;
// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { addEvent } from "../redux/clubEventsSlice";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const AddEvent = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [points, setPoints] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const dispatch = useDispatch();

//   const handleAddEvent = async (e) => {
//     e.preventDefault();
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/add-event`;
//       const response = await axios.post(
//         URL,
//         { name, points, description, event_date: selectedDate.toISOString() },
//         { withCredentials: true }
//       );
//       const event_date=selectedDate.toISOString()
//       if (response.data.success) {
//         dispatch(addEvent({ name, points, description ,event_date}));
//         toast.success("Event added successfully!");
//         setTimeout(() => {
//           navigate('/api/v1/club/profile', {
//             state: response?.data?.data,
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add event.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <ToastContainer />
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Add New Event
//         </h1>
//         <form onSubmit={handleAddEvent}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//               Event Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter event name"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="points" className="block text-gray-700 font-medium mb-2">
//               Event Points
//             </label>
//             <input
//               id="points"
//               type="number"
//               value={points}
//               onChange={(e) => setPoints(e.target.value)}
//               placeholder="Enter event points"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Event Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter event description"
//               rows="4"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             ></textarea>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
//               Event Date
//             </label>
//             <DatePicker
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date)}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="flex items-center justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             >
//               Add Event
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setName("");
//                 setPoints("");
//                 setDescription("");
//                 setSelectedDate(null); // Clear selected date on reset
//               }}
//               className="bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEvent;
// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useDispatch } from "react-redux";
// import { addEvent } from "../redux/clubEventsSlice";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format } from 'date-fns';

// const AddEvent = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [points, setPoints] = useState("");
//   const [description, setDescription] = useState("");
//   const [selectedDate, setSelectedDate] = useState(null);
//   const dispatch = useDispatch();

//   const handleAddEvent = async (e) => {
//     e.preventDefault();
//     try {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/add-event`;
//       const response = await axios.post(
//         URL,
//         { name, points, description, event_date: selectedDate.toISOString() },
//         { withCredentials: true }
//       );
//       const event_date=selectedDate.toISOString()
//       if (response.data.success) {
//         dispatch(addEvent({ name, points, description ,event_date}));
//         toast.success("Event added successfully!");
//         setTimeout(() => {
//           navigate('/api/v1/club/profile', {
//             state: response?.data?.data,
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to add event.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <ToastContainer />
//       <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
//         <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//           Add New Event
//         </h1>
//         <form onSubmit={handleAddEvent}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
//               Event Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Enter event name"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="points" className="block text-gray-700 font-medium mb-2">
//               Event Points
//             </label>
//             <input
//               id="points"
//               type="number"
//               value={points}
//               onChange={(e) => setPoints(e.target.value)}
//               placeholder="Enter event points"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-medium mb-2"
//             >
//               Event Description
//             </label>
//             <textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter event description"
//               rows="4"
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             ></textarea>
//           </div>

//           <div className="mb-4">
//             <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
//               Event Date
//             </label>
//             <DatePicker
//               selected={selectedDate}
//               onChange={(date) => setSelectedDate(date)}
//               className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>

//           <div className="flex items-center justify-between mt-6">
//             <button
//               type="submit"
//               className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             >
//               Add Event
//             </button>
//             <button
//               type="button"
//               onClick={() => {
//                 setName("");
//                 setPoints("");
//                 setDescription("");
//                 setSelectedDate(null); // Clear selected date on reset
//               }}
//               className="bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
//             >
//               Reset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddEvent;

import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { addEvent } from "../redux/clubEventsSlice";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from 'date-fns';

const AddEvent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initialize with default date
  const dispatch = useDispatch();

  const handleAddEvent = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !points || !description || !selectedDate) {
      toast.error("Please fill in all required fields (name, points, description).");
      return;
    }
    const eventDate =selectedDate.toISOString(); 

// Create a Date object from the ISO 8601 string
    const dateObj = new Date(eventDate);

    // Get the day, month (0-indexed), and year
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1; // Add 1 to get month in 1-indexed format
    const year = dateObj.getFullYear();

    // Format the date as "dd-mm-yyyy"
    const event_date = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    console.log(event_date)
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/add-event`;
      const response = await axios.post(
        URL,
        { name, points, description, event_date},
        { withCredentials: true }
      );

      if (response.data.success) {
        console.log()
        dispatch(addEvent({ name, points, description, event_date}));
        toast.success("Event added successfully!");
        setTimeout(() => {
          navigate('/api/v1/club/profile', {
            state: response?.data?.data,
          });
        }, 2000);
      } else {
        toast.error(response.data.message || "Failed to add event.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add event.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add New Event
        </h1>
        <form onSubmit={handleAddEvent}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Event Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter event name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="points" className="block text-gray-700 font-medium mb-2">
              Event Points
            </label>
            <input
              id="points"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              placeholder="Enter event points"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Event Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              rows="4"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Event Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              Add Event
            </button>
            <button
              type="button"
              onClick={() => {
                setName("");
                setPoints("");
                setDescription("");
                setSelectedDate(new Date()); // Reset to current date
              }}
              className="bg-gray-300 text-gray-800 font-medium px-6 py-2 rounded-lg shadow hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;