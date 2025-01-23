import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import pool from '../db/connection.js';

export const counsellorLogin=async(req,res)=>{
    const { username, password } = req.body;
    if(!username || !password){
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }
  try {
    const [rows] = await pool.query(
      "SELECT * FROM counsellor WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    const isPassword=await bcrypt.compare(password,user.password);
    if (!isPassword) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    generateToken(res, user, "counsellor", `Welcome back, ${user.name}`);
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export const counsellorRegister=async(req,res)=>{
    const {name,email, username, password } = req.body;
    console.log(name);
    if(!name || !username || !password || !email){
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }
    try {
      // Check if the username or email already exists
      const [existingUsers] = await pool.query(
        "SELECT * FROM counsellor WHERE username = ? AND name = ?",
        [username, name]
      );
  
      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Username or counsellor already exists",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new student into the database
      const [result] = await pool.query(
        "INSERT INTO counsellor (name,email,username, password) VALUES (?, ?, ?,?)",
        [name,email,username, hashedPassword]
      );
  
      // Respond with success
      return res.status(201).json({
        success: true,
        message: "Counsellor registered successfully",
        clubId: result.insertId, // Return the ID of the newly created student
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
}

export const counsellorLogout=async(req,res)=>{
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"Logged Out Successfully.",
            success:true
        })
    }catch (error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to logout"
        })
    }
}

export const getCounsellorProfile=async(req,res)=>{
    try {
  const userId = req.user.userId; // Get the counsellor ID from the token payload

  try {
    // Fetch students under the counsellor
    const [students] = await pool.query(
      `SELECT *
       FROM student 
       WHERE counsellor_id = ?`,
      [userId]
    );

    if (students.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No students found under this counsellor",
      });
    }

    // Fetch the department ID from the first student
    const departmentId = students[0].department_id;

    // Fetch the department name based on the department ID
    const [departmentRows] = await pool.query(
      `SELECT name AS department_name 
       FROM department 
       WHERE did = ?`,
      [departmentId]
    );

    if (departmentRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    const departmentName = departmentRows[0].department_name;

    // Initialize the response array
    const studentsWithEvents = [];

    // Fetch events for each student
    for (const student of students) {
      const [department] = await pool.query(
        `SELECT name
         FROM department 
         WHERE did = ?`,
        [student.department_id]
      );
      // dname=department[0]
      const [events] = await pool.query(
        `SELECT 
           es.event_id,
           e.name AS event_name,
           es.points
         FROM event_student es
         JOIN events e ON es.event_id = e.eid
         WHERE es.student_id = ? AND es.approved = 1`,
        [student.sid]
      );
      const dname=department[0]
      // console.log(department[0])
      // Format the events
      const formattedEvents = events.map((event) => ({
        event_id: event.event_id,
        name: event.event_name,
        points: event.points || 0, // Use 0 if points are NULL
      }));

      // Add the student and their events to the response array
      studentsWithEvents.push({
        student_id: student.sid,
        usn:student.usn,
        name: student.name,
        email:student.email,
        department:dname.name,
        events: formattedEvents,
      });
    }

    // Fetch counsellor details
    const [counsellorRows] = await pool.query(
      `SELECT cid, name, email 
       FROM counsellor 
       WHERE cid = ?`,
      [userId]
    );

    const counsellor = counsellorRows[0];

    // Return the formatted response
    return res.status(200).json({
      success: true,
      counsellor: {
        id: counsellor.cid,
        name: counsellor.name,
        email: counsellor.email,
        department: departmentName, // Assign the dynamically fetched department name
      },
      students: studentsWithEvents,
    });
  } catch (error) {
    console.error("Error fetching students under counsellor:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
 }
  catch(err){
    console.error("Error fetching students under counsellor:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}
export const getCounsellors=async(req,res)=>{
    try{
        const [rows] = await pool.query(
            "SELECT * FROM counsellor"
          );
          const counsellors=rows;
          return res.status(200).json({ success: true, message: "List Of All Counsellors",counsellors});
    }catch (error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Get Counsellors"
        })
    }
}
export const getStudent = async (req, res) => {
  // const { studentID } = req.body;
  // console.log(req.body.studentID)
  const {studentID}=req.body;
  // console.log(studentID.studentId)
  const id=studentID.studentId;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Please provide student id",
    });
  }

  try {
    // Query to get events and total points of the student
    // const [student]=await pool.query(
    //   `SELECT * FROM student WHERE sid=?`,[id]
    // );
    const [student] = await pool.query(
      `SELECT 
         s.sid, s.usn, s.name, s.email, s.department_id, s.counsellor_id, 
         d.name AS department_name, 
         c.name AS counsellor_name 
       FROM student s
       LEFT JOIN department d ON s.department_id = d.did
       LEFT JOIN counsellor c ON s.counsellor_id = c.cid
       WHERE s.sid = ?`,
      [id]
    );
    const [rows] = await pool.query(
      `SELECT es.event_id, e.name, e.points ,e.event_date
       FROM event_student es
       JOIN events e ON es.event_id = e.eid
       WHERE es.student_id = ? AND es.approved=1`,
      [id]
    );
    
    // Calculate total points
    const totalPoints = rows.reduce((acc, event) => acc + event.points, 0);

    // console.log("EVENTS = ", rows);

    return res.status(200).json({
      success: true,
      events: rows,
      students:student,
      totalPoints: totalPoints,  // Send total points along with events
    });
  } catch (error) {
    console.error("Failed To fetch Events ,", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
