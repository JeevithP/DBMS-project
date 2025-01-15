import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    usn: '',
    name: '',
    department: '',
    counsellor: '',
  });
  const [departments, setDepartments] = useState([]);
  const [counsellors, setCounsellors] = useState([]);

  // Fetch departments and counsellors from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const departmentResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/department`);
        setDepartments(departmentResponse.data.departments);
        const counsellorResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/get-all-counsellors`);
        setCounsellors(counsellorResponse.data.counsellors);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data?.message || error.message);
      }
    };
    fetchData();
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation()

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/register`;
    // console.log(formData)
    try {
      const response = await axios.post(URL, formData);
      console.log(response)
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      if(response.data.success){
        setFormData({
          username: '',
          email: '',
          password: '',
          usn: '',
          name: '',
          department: '',
          counsellor: '',
        })
        setTimeout(() => {
          navigate('/api/v1/student/login',{
            state : response?.data?.data
          })
        }, 2000);
        
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("User already exists", {
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
    
    <div
      style={{
        maxWidth: '400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    ><ToastContainer />,
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Student Registration</h2>
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {[
          { name: 'username', type: 'text', placeholder: 'Enter username' },
          { name: 'email', type: 'email', placeholder: 'Enter email' },
          { name: 'password', type: 'password', placeholder: 'Enter password' },
          { name: 'usn', type: 'text', placeholder: 'Enter USN' },
          { name: 'name', type: 'text', placeholder: 'Enter full name' },
        ].map((field) => (
          <div key={field.name}>
            <label
              style={{
                display: 'block',
                fontWeight: 'bold',
                marginBottom: '5px',
                color: '#555',
              }}
            >
              {field.name.toUpperCase()}
            </label>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
        ))}
        {/* Dropdown for Departments */}
        <div>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#555',
            }}
          >
            DEPARTMENT
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          >
            <option value="" disabled>
              Select Department
            </option>
            {departments.map((department) => (
              <option key={department.id} >
                {department.name}
              </option>
            ))}
          </select>
        </div>
        {/* Dropdown for Counsellors */}
        <div>
          <label
            style={{
              display: 'block',
              fontWeight: 'bold',
              marginBottom: '5px',
              color: '#555',
            }}
          >
            COUNSELLOR
          </label>
          <select
            name="counsellor"
            value={formData.counsellor}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          >
            <option value="" disabled>
              Select Counsellor
            </option>
            {counsellors.map((counsellor) => (
              <option key={counsellor.id} value={counsellor.id}>
                {counsellor.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
        Register
        </button>
        
      </form>
      <div style={registerLinkContainer}>
          <p style={registerText}>Already have an account?</p>
          <button onClick={() => navigate("/api/v1/student/login")} style={registerButton}>Login</button>
        </div>
    </div>
  );
};

export default StudentRegister;


