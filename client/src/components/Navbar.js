import React from "react";
import axios from 'axios'
import { Await, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../redux/userSlice";


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state?.user)
  const handleLogout = async(e) => {
    // Clear Redux state and localStorage on logout
    e.preventDefault()
    e.stopPropagation()

        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/logout`
        const response = await axios.get(URL,{
          withCredentials: true,
        })
    dispatch(logout());
    localStorage.clear();
    navigate("/api/v1/student/login");
  };
  const val=user.name
  if(val==""){
    return (
    <nav
      style={{
        backgroundColor: "#282c34",
        padding: "35px 20px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        width:"100%",
        height:"100%"
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        Student Portal
      </h2>
    </nav>
    )
  }
  return (
    <nav
      style={{
        backgroundColor: "#282c34",
        // padding: "10px 20px",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        width:"100%",
        height:"100%"
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "24px",
          cursor: "pointer",
        }}
      >
        Student Portal
      </h2>
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "#61dafb",
          color: "#000",
          border: "none",
          padding: "10px 15px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
