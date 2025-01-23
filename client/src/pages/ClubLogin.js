import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClubToken } from '../redux/clubUserSlice';

const ClubLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/login`;
    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          username,
          password
        },
        withCredentials: true
      });
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      if (response.data.success) {
        dispatch(setClubToken(response?.data?.token));
        localStorage.setItem('token',response?.data?.token);
        navigate('/api/v1/club/profile');
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("Club does not exist!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } else if (error.response && error.response.status === 401) {
        toast.error("Invalid password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Club Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded mt-4">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <button
          onClick={() => navigate("/api/v1/club/register")}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
        >
          Register
        </button>
      </div>
      </div>
    </div>
  );
};

export default ClubLogin;

