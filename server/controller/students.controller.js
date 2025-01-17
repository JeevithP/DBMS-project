import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import pool from '../db/connection.js';

export const studentLogin=async(req,res)=>{
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }
  try {
    const [rows] = await pool.query(
      "SELECT * FROM student WHERE username = ?",
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

    generateToken(res, user, "student", `Welcome back, ${user.name}`);
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export const studentRegister = async (req, res) => {
    const { username, email, password,usn,name,department,counsellor } = req.body;
  
    try {
      // Check if the username or email already exists
      const [existingUsers] = await pool.query(
        "SELECT * FROM student WHERE username = ? OR email = ?",
        [username, email]
      );
  
      if (existingUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: "Username or Email already exists",
        });
      }
      // Get dept_id
      const [getDeptId] = await pool.query(
        "SELECT * FROM department WHERE name=?",
        [department]
      );
      
      const department_id=getDeptId[0].did;

      // Get cid
      const [getCounsId] = await pool.query(
        "SELECT * FROM counsellor WHERE name=?",
        [counsellor]
      );
      console.log(getCounsId[0]);
      const counsellor_id=getCounsId[0].cid;
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the new student into the database
      const [result] = await pool.query(
        "INSERT INTO student (username, email, password,usn,name,department_id,counsellor_id) VALUES (?, ?, ?,?, ?, ?,?)",
        [username, email, hashedPassword,usn,name,department_id,counsellor_id]
      );
  
      // Respond with success
      return res.status(201).json({
        success: true,
        message: "Student registered successfully",
        studentId: result.insertId, // Return the ID of the newly created student
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

export const studentLogout=(req,res)=>{
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

export const getStudentProfile=async (req,res)=>{
    try {
        const userId = req.user.userId; // Extracted from the authenticated user's token
        // console.log(req.user);
        // Fetch student details from the database
        const [rows] = await pool.query(
          "SELECT sid, usn, name, email, department_id, counsellor_id,username FROM student WHERE sid = ?",
          [userId]
        );
    
        if (rows.length === 0) {
          return res.status(404).json({ success: false, message: "Student not found" });
        }
    
        const student = rows[0];
        return res.status(200).json({ success: true, student });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
      }
}

export const studentProfileUpdate = async (req, res) => {
    const userId = req.user.userId;
    const updates = req.body;
  
    try {
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ success: false, message: "No fields provided for update" });
      }
  
      const fields = [];
      const values = [];
      for (const [key, value] of Object.entries(updates)) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
      values.push(userId);
  
      const query = `UPDATE student SET ${fields.join(", ")} WHERE sid = ?`;
  
      const [result] = await pool.query(query, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Student not found or no changes made" });
      }
  
      return res.status(200).json({ success: true, message: "Profile updated successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
  };
  export const getAllEvents = async (req, res) => {
    const student_id = req.user.userId; // Extract student ID from authenticated user

    try {
        // Query to get events not registered by the student
        const eventsNotRegisteredByStudent = await pool.query(`
            SELECT * FROM events 
            WHERE eid NOT IN (
                SELECT eid FROM event_student
                WHERE student_id = ?
            )
        `, [student_id]);

        // Check if any events were found
        if (eventsNotRegisteredByStudent.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No Events Available"
            });
        }

        // Return the list of events
        return res.status(200).json({
            success: true,
            message: "Events Fetched Successfully",
            data: eventsNotRegisteredByStudent[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to Get Events"
        });
    }
};
export const registerForEvent = async (req, res) => {
    const student_id = req.user.userId; // Extract student ID from authenticated user
    const { eid } = req.body; // Get eid from the request body

    // Validate input
    if (!eid) {
        return res.status(400).json({
            success: false,
            message: "Event ID is required",
        });
    }

    try {
        // Check if the event exists
        const eventExists = await db.query("SELECT * FROM events WHERE eid = ?", [eid]);
        if (eventExists.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found",
            });
        }

        // Check if the student is already registered for the event
        const alreadyRegistered = await db.query(
            "SELECT * FROM event_student WHERE student_id = ? AND eid = ?",
            [student_id, eid]
        );
        if (alreadyRegistered.length > 0) {
            return res.status(400).json({
                success: false,
                message: "You are already registered for this event",
            });
        }

        // Register the student for the event
        await db.query(
            "INSERT INTO event_student (student_id, eid, approved) VALUES (?, ?, ?)",
            [student_id, eid, false]
        );

        // Success response
        return res.status(201).json({
            success: true,
            message: "Successfully registered for the event. Awaiting approval.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to register for the event",
        });
    }
};

export const getEventsByStudentID = async (req,res) => {

  const { studentID } = req.body;
  // const clubId = req.user.userId;

  if(!studentID){
      return res.status(400).json({
          success: false,
          message: "Please provide student id",
      });
  }

  try {
      const [rows] = await pool.query("SELECT * FROM event_student WHERE student_id=?",
        [studentID,]
      )

      console.log("EVENTS = ");
      console.log(rows);

      return res.status(201).json({
          success: true,
          events: rows,
      });

  }
  catch(error){
      console.error("Failed To delete Event ,", error);
      res.status(500).json({ success: false, message: "Server error" })
  }
}