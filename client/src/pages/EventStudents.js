import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventStudents = () => {
  const { eid } = useParams(); // Get event ID from the URL
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/get-students`;
        const response = await axios.post(
          URL,
          { eid },
          { withCredentials: true }
        );
        console.log(response.data.students)
        if (response.data.success) {
          const transformedStudents = response.data.students.map((student) => ({
            student_id: student.sid, // Change 'sid' to 'student_id'
            name: student.name,
            email: student.email,
            approved: student.approved === 1, // Convert 'approved' to boolean
          }));
          setStudents(transformedStudents);
        } else {
          toast.error("Failed to fetch students");
        }
      } catch (error) {
        toast.error("Error fetching students.");
      }
    };

    fetchStudents();
  }, [eid]);

  const approveStudents = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/club/verify-students`;
      const response = await axios.post(
        URL,
        { eid, studentIds: selectedStudents },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setStudents((prev) =>
          prev.map((student) =>
            selectedStudents.includes(student.student_id)
              ? { ...student, approved: true }
              : student
          )
        );
        setSelectedStudents([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error approving students.");
    }
  };

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Students for Event {eid}</h1>
          {students.length > 0 ? (
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Approved</th>
                  <th className="px-4 py-2">Select</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.student_id}>
                    <td className="border px-4 py-2">{student.name}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                    <td className="border px-4 py-2">
                      {student.approved ? "Yes" : "No"}
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.student_id)}
                        onChange={() => handleCheckboxChange(student.student_id)}
                        disabled={student.approved}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No students available for this event.</p>
          )}
          {students.length > 0 && (
            <button
              onClick={approveStudents}
              className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600"
            >
              Approve Selected Students
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventStudents;
