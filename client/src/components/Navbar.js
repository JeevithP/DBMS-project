// import React from "react";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { logout } from "../redux/userSlice";
// import { logoutClubUser } from "../redux/clubUserSlice";
// import { logoutCounsellor } from "../redux/counsellorSlice";
// import clogo from './clogo.png'; // Assuming the logo is in the same folder

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state?.user);
//   const club = useSelector((state) => state?.clubUser);
//   const counsellor = useSelector((state) => state?.counsellor);

//   const handleLogout = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (user.name) {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/logout`;
//       await axios.get(URL, { withCredentials: true });
//       dispatch(logout());
//       localStorage.clear();
//       navigate("/api/v1/student/login");
//     } else if (club.name) {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/logout`;
//       await axios.get(URL, { withCredentials: true });
//       dispatch(logoutClubUser());
//       localStorage.clear();
//       navigate("/api/v1/club/login");
//     } else if (counsellor.name) {
//       const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/logout`;
//       await axios.get(URL, { withCredentials: true });
//       dispatch(logoutCounsellor());
//       localStorage.clear();
//       navigate("/api/v1/counsellor/login");
//     }
//   };

//   const val = user.name || club.name || counsellor.name;

//   return (
//     <nav className="bg-gray-800 text-white flex justify-between items-center p-4 shadow-lg w-full">
//       <div className="flex items-center gap-3">
//         {/* Circular Logo */}
//         <img
//           src={clogo}
//           alt="Logo"
//           className="h-12 w-12 object-cover rounded-full cursor-pointer"
//         />
//         {/* Link to Home */}
//         <div
//           className="text-2xl font-bold text-white hover:text-gray-300"
//         >
//           Student Portal
//         </div>
//       </div>
//       {val && (
//         <button
//           onClick={handleLogout}
//           className="bg-blue-500 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-blue-400"
//         >
//           Logout
//         </button>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { logoutClubUser } from "../redux/clubUserSlice";
import { logoutCounsellor } from "../redux/counsellorSlice";
import clogo from './clogo.png'; // Assuming the logo is in the same folder
import { Button, Modal, Box, Typography } from '@mui/material';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const club = useSelector((state) => state?.clubUser);
  const counsellor = useSelector((state) => state?.counsellor);

  const [open, setOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (user.name) {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/student/logout`;
      await axios.get(URL, { withCredentials: true });
      dispatch(logout());
      localStorage.clear();
      navigate("/");
    } else if (club.name) {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/logout`;
      await axios.get(URL, { withCredentials: true });
      dispatch(logoutClubUser());
      localStorage.clear();
      navigate("/");
    } else if (counsellor.name) {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/logout`;
      await axios.get(URL, { withCredentials: true });
      dispatch(logoutCounsellor());
      localStorage.clear();
      navigate("/");
    }
  };

  const handleInfoOpen = () => setOpen(true);
  const handleInfoClose = () => setOpen(false);

  const val = user.name || club.name || counsellor.name;

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center p-4 shadow-lg w-full">
      <div className="flex items-center gap-3">
        {/* Circular Logo */}
        <img
          src={clogo}
          alt="Logo"
          className="h-12 w-12 object-cover rounded-full cursor-pointer"
        />
        {/* Link to Home */}
        <div className="text-2xl font-bold text-white hover:text-gray-300">
          Student Portal
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Info Button */}
        <Button
          onClick={handleInfoOpen}
          variant="outlined"
          color="info"
          className="text-white hover:bg-gray-600"
        >
          Info
        </Button>
        {val && (
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-blue-400"
          >
            Logout
          </button>
        )}
      </div>

      {/* Info Modal */}
      <Modal
        open={open}
        onClose={handleInfoClose}
        aria-labelledby="info-modal-title"
        aria-describedby="info-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: 24,
            width: '80%',
            maxWidth: '500px',
          }}
        >
          <Typography id="info-modal-title" variant="h6" component="h2">
            About This Website
          </Typography>
          <Typography id="info-modal-description" sx={{ mt: 2 }}>
            This platform is designed to manage and track activity points for students. It enables students, clubs, and counselors to interact effectively, helping in the smooth running of activity-based projects and their management.
          </Typography>
          <Button
            onClick={handleInfoClose}
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </nav>
  );
};

export default Navbar;
