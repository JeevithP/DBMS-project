import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);

  const fetchUserDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/profile`;
      const response = await axios.get(URL, {
        withCredentials: true,
      });

      console.log(response);
      dispatch(setUser(response.data.student));
    } catch (error) {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
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
          fontSize: "20px", // Increased font size for loading screen
        }}
      >
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Helvetica Neue', Arial, sans-serif", // Professional font style
        backgroundColor: "#f5f6fa",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "40px",
          width: "80%",
          height: "80vh",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e0e0e0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            color: "#2c3e50",
            marginBottom: "30px",
            fontSize: "36px", // Professional heading size
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Student Profile
        </h1>
        <div
          style={{
            fontSize: "18px", // Increased font size for body text
            color: "#333",
            lineHeight: "1.8", // Increased line height for better readability
            margin: "0 auto",
            maxWidth: "500px",
          }}
        >
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
            <strong>Department:</strong> {user.department_id}
          </p>
          <p>
            <strong>Counsellor:</strong> {user.counsellor_id || "Not Assigned"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

