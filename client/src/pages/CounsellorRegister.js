import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CounsellorRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/register`, { name, email, username, password });
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/api/v1/counsellor/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div style={styles.container}>
      <ToastContainer />
      <div style={styles.formWrapper}>
        <h2 style={styles.heading}>Counsellor Register</h2>
        <form onSubmit={handleRegister}>
          <input
            style={styles.input}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button style={styles.button} type='submit'>
            Register
          </button>
        </form>
        <div style={styles.registerLinkContainer}>
          <p style={styles.registerText}>Already have an account?</p>
          <button onClick={() => navigate("/api/v1/counsellor/login")} style={styles.registerButton}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    fontFamily: "Arial, sans-serif",
  },
  formWrapper: {
    background: "#fff",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    width: "400px",
    textAlign: "center",
  },
  heading: {
    marginBottom: "1.5rem",
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "0.8rem",
    marginBottom: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.8rem",
    backgroundColor: "#2575fc",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
  registerLinkContainer: {
    marginTop: "1rem",
  },
  registerText: {
    marginBottom: "0.5rem",
  },
  registerButton: {
    backgroundColor: "#6a11cb",
    color: "#fff",
    padding: "0.8rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default CounsellorRegister;