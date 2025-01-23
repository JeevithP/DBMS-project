import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../redux/clubEventsSlice";
import { useNavigate } from "react-router-dom";

const DeleteEvent = () => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteEvent = async (e) => {
    e.preventDefault();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/del-event`;
      const response = await axios.delete(URL, {
        data: { name },
        withCredentials: true,
      });
      if (response.data.success) {
        dispatch(deleteEvent(name));
        toast.success("Event deleted successfully!");
        setTimeout(() => {
          navigate('/api/v1/club/profile', {
            state: response?.data?.data,
          });
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete event.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Delete Event
        </h1>
        <form onSubmit={handleDeleteEvent}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Event Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter the name of the event to delete"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-red-600 text-white font-medium px-6 py-2 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            >
              Delete Event
            </button>
            <button
              type="button"
              onClick={() => setName("")}
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

export default DeleteEvent;
