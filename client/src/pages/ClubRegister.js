import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ClubRegister = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Club name is required";
    if (!username.trim()) newErrors.username = "Username is required";
    if (!password.trim() || password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/register`;
      const response = await axios.post(URL, { name, username, password });
      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
      });
      if (response.data.success) {
        setName("")
        setUsername("")
        setPassword("")
        setTimeout(() => {
          navigate('/api/v1/club/login', {
            state: response?.data?.data,
          });
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('User already exists.', {
          position: 'top-right',
          autoClose: 3000,
        });
      } else {
        toast.error('An unexpected error occurred.', {
          position: 'top-right',
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Club Registration</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Club Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded mt-4"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default ClubRegister;
