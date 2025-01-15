import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import StudentLogin from "../pages/StudentLogin";
import StudentRegister from "../pages/StudentRegister";
import ClubLogin from "../pages/ClubLogin";
import ClubRegister from "../pages/ClubRegister";
import CounsellorLogin from "../pages/CounsellorLogin";
import CounsellorRegister from "../pages/CounsellorRegister";
import Home from "../pages/Home";
// import StudentProfile from "../pages/StudentProfile";
// import ClubProfile from "../pages/ClubProfile";
// import CounsellorProfile from "../pages/CounsellorProfile";
import AuthLayouts from "../layout";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "api/v1/student/login",
        element: <AuthLayouts><StudentLogin /></AuthLayouts>,
      },
      {
        path: "api/v1/student/register",
        element: <AuthLayouts><StudentRegister /></AuthLayouts>,
      },
      {
        path: "api/v1/club/login",
        element: <AuthLayouts><ClubLogin /></AuthLayouts>,
      },
      {
        path: "api/v1/club/register",
        element: <AuthLayouts><ClubRegister /></AuthLayouts>,
      },
      {
        path: "api/v1/counsellor/login",
        element: <AuthLayouts><CounsellorLogin /></AuthLayouts>,
      },
      {
        path: "api/v1/counsellor/register",
        element: <AuthLayouts><CounsellorRegister /></AuthLayouts>,
      },
      {
        path: "api/v1/student/profile",
        element: <AuthLayouts><Home /></AuthLayouts>,
        // children: [
        //   {
        //     path: "profile",
        //     element: <Activities/>,
        //   },
        //   // {
        //   //   path: "club/profile",
        //   //   element: <ClubProfile />,
        //   // },
        //   // {
        //   //   path: "counsellor/profile",
        //   //   element: <CounsellorProfile />,
        //   // },
        // ],
      },
    ],
  },
]);

export default router;
