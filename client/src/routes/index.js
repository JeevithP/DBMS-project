import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import StudentLogin from "../pages/StudentLogin";
import StudentRegister from "../pages/StudentRegister";
import ClubLogin from "../pages/ClubLogin";
import ClubRegister from "../pages/ClubRegister";
import CounsellorLogin from "../pages/CounsellorLogin";
import CounsellorRegister from "../pages/CounsellorRegister";
import StudentHome from "../pages/StudentHome";
import ClubHome from "../pages/ClubHome";
import AddEvent from "../pages/AddEvent";
import DeleteEvent from "../pages/DeleteEvent";
import EventStudents from "../pages/EventStudents";
import ViewEvents from "../pages/ViewEvents";
import CounsellorHome from "../pages/CounsellorHome";
import CounsellorStudent from "../pages/CounsellorStudent";
import Home from "../pages/Home";
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
        element: <AuthLayouts><StudentHome /></AuthLayouts>,
      },
      {
        path: "api/v1/student/get-events",
        element: <AuthLayouts><ViewEvents /></AuthLayouts>,
      },
      {
        path: "api/v1/club/profile",
        element: <AuthLayouts><ClubHome /></AuthLayouts>,
      },
      {
        path: "api/v1/club/add-event",
        element: <AuthLayouts><AddEvent /></AuthLayouts>,
      },
      {
        path: "api/v1/club/delete-event",
        element: <AuthLayouts><DeleteEvent /></AuthLayouts>,
      },
      {
        path: "api/v1/club/event/:eid",
        element: <AuthLayouts><EventStudents /></AuthLayouts>, 
      },
      {
        path: "api/v1/counsellor/profile",
        element: <AuthLayouts><CounsellorHome /></AuthLayouts>, 
      },
      {
        path: "api/v1/counsellor/students/:studentId",
        element: <AuthLayouts><CounsellorStudent /></AuthLayouts>, 
      },
      {
        path: "/",
        element: <AuthLayouts><Home /></AuthLayouts>, 
      },
    ],
  },
]);

export default router;
