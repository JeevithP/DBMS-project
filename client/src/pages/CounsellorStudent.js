 import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewStudentProfile = () => {
  const studentID = useParams(); // Make sure to get the student_id from URL params
  const [studentDetails, setStudentDetails] = useState(null);
  const [totalPoints, setTotalPoints] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStudentDetails = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/counsellor/student`;
      const response = await axios.post(
        URL,
        { studentID }, // Send student ID in the request body
        { withCredentials: true }
      );

      // Destructure the response to get student and events
      // const { student, events } = response.data;
      const student = response.data.students[0];
      const events = response.data.events;
      console.log(events)
      const totalPoints=response.data.totalPoints;
      // console.log(student)
      // console.log(events)
      // console.log(totalPoints)
      setStudentDetails(student);
      setTotalPoints(totalPoints);
      if (response.data.events[0] && Array.isArray(response.data.events)) {
        setEvents(events);
      } else {
        console.error("student_points is not an array or doesn't exist.");
      };
      setEvents(events);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch student details.");
      console.log("Error fetching student details:", error);
    }
  };

  useEffect(() => {
    fetchStudentDetails();
  }, [studentID]); // Fetch data when student ID changes

  if (loading) {
    return <p>Loading student profile...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <ToastContainer />
        {/* Student Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
          <p>
            <strong>Name:</strong> {studentDetails.name}
          </p>
          <p>
            <strong>USN:</strong> {studentDetails.usn}
          </p>
          <p>
            <strong>Email:</strong> {studentDetails.email}
          </p>
          <p>
            <strong>Department:</strong> {studentDetails.department_name}
          </p>
          <p>
            <strong>Counsellor:</strong> {studentDetails.counsellor_name || "Not Assigned"}
          </p>
          <p className="mb-4">
            <strong>Total Activity Points:</strong> {totalPoints}
          </p>
        </div>

        {/* Student Events Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Attended Events and Points</h1>
          {events.length === 0 ? (
            <p>No events attended</p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Event Name</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Points</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.event_id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{event.name}</td>
                    <td className="border border-gray-300 p-2">
                      {event.event_date}
                    </td>
                    <td className="border border-gray-300 p-2">{event.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Button to navigate back to Counsellor Home */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/api/v1/counsellor/profile")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Back to Counsellor Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentProfile;

