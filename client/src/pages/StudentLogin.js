import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../redux/userSlice';


const StudentLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const URL=`${process.env.REACT_APP_BACKEND_URL}/api/v1/student/login`;
    try {
      const response = await axios({
        method :'post',
        url : URL,
        data : {
          username ,
          password
        },
        withCredentials : true
      })
      console.log(response.data)
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      if(response.data.success){
        dispatch(setToken(response?.data?.token))
      //  dispatch(setUser(response?.data?.user))
        localStorage.setItem('token',response.data.token)
        navigate('/api/v1/student/profile')
    }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 404) {
        toast.error("User does not exist!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
      else if (error.response && error.response.status === 401) {
        toast.error("Invalid password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      } 
       else {
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
    fontFamily: 'Arial, sans-serif',
  };

  const formWrapperStyle = {
    background: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
    width: '400px',
    textAlign: 'center',
  };

  const headingStyle = {
    marginBottom: '1.5rem',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#444',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    marginBottom: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '1rem',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.8rem',
    backgroundColor: '#2575fc',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  };

  const registerLinkContainer = {
    textAlign: 'center',
    marginTop: '1rem',
  };

  const registerText = {
    fontSize: '14px',
    color: '#555',
  };

  const registerButton = {
    backgroundColor: '#008CBA',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '5px',
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <div style={formWrapperStyle}>
        <h2 style={headingStyle}>Student Login</h2>
        <form onSubmit={handleLogin}>
          <input
            style={inputStyle}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={buttonStyle} type="submit">Login</button>
        </form>
        <div style={registerLinkContainer}>
          <p style={registerText}>Don't have an account?</p>
          <button onClick={() => navigate("/api/v1/student/register")} style={registerButton}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
