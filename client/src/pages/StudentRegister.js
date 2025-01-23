// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// const StudentRegister = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     usn: '',
//     name: '',
//     department: '',
//     counsellor: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [departments, setDepartments] = useState([]);
//   const [counsellors, setCounsellors] = useState([]);

//   // Fetch departments and counsellors from backend
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const departmentResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/department`);
//         setDepartments(departmentResponse.data.departments);
//         const counsellorResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/get-all-counsellors`);
//         setCounsellors(counsellorResponse.data.counsellors);
//       } catch (error) {
//         console.error("Error fetching data:", error.response?.data?.message || error.message);
//       }
//     };
//     fetchData();
//   }, []);

//   const validateForm = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; // Minimum 6 characters, at least 1 letter and 1 number.

//     if (!formData.username.trim()) newErrors.username = 'Username is required.';
//     if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email.';
//     if (!formData.password || !passwordRegex.test(formData.password))
//       newErrors.password = 'Password must be at least 6 characters long and include both letters and numbers.';
//     if (!formData.usn.trim()) newErrors.usn = 'USN is required.';
//     if (!formData.name.trim()) newErrors.name = 'Full name is required.';
//     if (!formData.department) newErrors.department = 'Please select a department.';
//     if (!formData.counsellor) newErrors.counsellor = 'Please select a counsellor.';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       toast.error('Please fix the errors before submitting.', {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       return;
//     }

//     const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/register`;
//     try {
//       const response = await axios.post(URL, formData);
//       toast.success(response.data.message, {
//         position: 'top-right',
//         autoClose: 3000,
//       });
//       if (response.data.success) {
//         setFormData({
//           username: '',
//           email: '',
//           password: '',
//           usn: '',
//           name: '',
//           department: '',
//           counsellor: '',
//         });
//         setTimeout(() => {
//           navigate('/api/v1/student/login', {
//             state: response?.data?.data,
//           });
//         }, 2000);
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         toast.error('User already exists.', {
//           position: 'top-right',
//           autoClose: 3000,
//         });
//       } else {
//         toast.error('An unexpected error occurred.', {
//           position: 'top-right',
//           autoClose: 3000,
//         });
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: '400px',
//         margin: '50px auto',
//         padding: '20px',
//         border: '1px solid #ddd',
//         height:'100vh',
//         // borderRadius: '8px',
//         backgroundColor: '#f9f9f9',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <ToastContainer />
//       <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Student Registration</h2>
//       <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
//         {[
//           { name: 'username', type: 'text', placeholder: 'Enter username' },
//           { name: 'email', type: 'email', placeholder: 'Enter email' },
//           { name: 'password', type: 'password', placeholder: 'Enter password' },
//           { name: 'usn', type: 'text', placeholder: 'Enter USN' },
//           { name: 'name', type: 'text', placeholder: 'Enter full name' },
//         ].map((field) => (
//           <div key={field.name}>
//             <label
//               style={{
//                 display: 'block',
//                 fontWeight: 'bold',
//                 marginBottom: '5px',
//                 color: '#555',
//               }}
//             >
//               {field.name.toUpperCase()}
//             </label>
//             <input
//               name={field.name}
//               type={field.type}
//               placeholder={field.placeholder}
//               value={formData[field.name]}
//               onChange={handleChange}
//               required
//               style={{
//                 width: '100%',
//                 padding: '10px',
//                 border: '1px solid #ccc',
//                 borderRadius: '4px',
//                 boxSizing: 'border-box',
//               }}
//             />
//             {errors[field.name] && (
//               <span style={{ color: 'red', fontSize: '12px' }}>{errors[field.name]}</span>
//             )}
//           </div>
//         ))}
//         {/* Dropdown for Departments */}
//         <div>
//           <label
//             style={{
//               display: 'block',
//               fontWeight: 'bold',
//               marginBottom: '5px',
//               color: '#555',
//             }}
//           >
//             DEPARTMENT
//           </label>
//           <select
//             name="department"
//             value={formData.department}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '10px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               boxSizing: 'border-box',
//             }}
//           >
//             <option value="" disabled>
//               Select Department
//             </option>
//             {departments.map((department) => (
//               <option key={department.id} value={department.id}>
//                 {department.name}
//               </option>
//             ))}
//           </select>
//           {errors.department && <span style={{ color: 'red', fontSize: '12px' }}>{errors.department}</span>}
//         </div>
//         {/* Dropdown for Counsellors */}
//         <div>
//           <label
//             style={{
//               display: 'block',
//               fontWeight: 'bold',
//               marginBottom: '5px',
//               color: '#555',
//             }}
//           >
//             COUNSELLOR
//           </label>
//           <select
//             name="counsellor"
//             value={formData.counsellor}
//             onChange={handleChange}
//             required
//             style={{
//               width: '100%',
//               padding: '10px',
//               border: '1px solid #ccc',
//               borderRadius: '4px',
//               boxSizing: 'border-box',
//             }}
//           >
//             <option value="" disabled>
//               Select Counsellor
//             </option>
//             {counsellors.map((counsellor) => (
//               <option key={counsellor.id} value={counsellor.id}>
//                 {counsellor.name}
//               </option>
//             ))}
//           </select>
//           {errors.counsellor && <span style={{ color: 'red', fontSize: '12px' }}>{errors.counsellor}</span>}
//         </div>
//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '10px',
//             backgroundColor: '#007bff',
//             border: 'none',
//             borderRadius: '4px',
//             color: 'white',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           Register
//         </button>
//       </form>
//       <div style={{ textAlign: 'center', marginTop: '1rem' }}>
//         <p style={{ fontSize: '14px', color: '#555' }}>Already have an account?</p>
//         <button
//           onClick={() => navigate('/api/v1/student/login')}
//           style={{
//             backgroundColor: '#008CBA',
//             color: 'white',
//             border: 'none',
//             padding: '10px 20px',
//             borderRadius: '5px',
//             cursor: 'pointer',
//             fontSize: '16px',
//             marginTop: '5px',
//           }}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default StudentRegister;
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

  const [errors, setErrors] = useState({});
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
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/; // Minimum 6 characters, at least 1 letter and 1 number.

    if (!formData.username.trim()) newErrors.username = 'Username is required.';
    if (!formData.email.trim() || !emailRegex.test(formData.email)) newErrors.email = 'Enter a valid email.';
    if (!formData.password || !passwordRegex.test(formData.password))
      newErrors.password = 'Password must be at least 6 characters long and include both letters and numbers.';
    if (!formData.usn.trim()) newErrors.usn = 'USN is required.';
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.department) newErrors.department = 'Please select a department.';
    if (!formData.counsellor) newErrors.counsellor = 'Please select a counsellor.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/register`;
    try {
      const response = await axios.post(URL, formData);
      toast.success(response.data.message);
      if (response.data.success) {
        setFormData({
          username: '',
          email: '',
          password: '',
          usn: '',
          name: '',
          department: '',
          counsellor: '',
        });
        setTimeout(() => {
          navigate('/api/v1/student/login', {
            state: response?.data?.data,
          });
        }, 2000);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('User already exists.');
      } else {
        toast.error('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-700">Student Registration</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          {[
            { name: 'username', type: 'text', placeholder: 'Enter username' },
            { name: 'email', type: 'email', placeholder: 'Enter email' },
            { name: 'password', type: 'password', placeholder: 'Enter password' },
            { name: 'usn', type: 'text', placeholder: 'Enter USN' },
            { name: 'name', type: 'text', placeholder: 'Enter full name' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                {field.name.toUpperCase()}
              </label>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors[field.name] && (
                <span className="text-sm text-red-500">{errors[field.name]}</span>
              )}
            </div>
          ))}

          {/* Dropdown for Departments */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">DEPARTMENT</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="" disabled>
                Select Department
              </option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            {errors.department && <span className="text-sm text-red-500">{errors.department}</span>}
          </div>

          {/* Dropdown for Counsellors */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">COUNSELLOR</label>
            <select
              name="counsellor"
              value={formData.counsellor}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
            {errors.counsellor && <span className="text-sm text-red-500">{errors.counsellor}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <button
            onClick={() => navigate('/api/v1/student/login')}
            className="mt-2 px-4 py-2 bg-gray-500 text-white text-sm font-semibold rounded-lg hover:bg-gray-600 transition duration-300"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
