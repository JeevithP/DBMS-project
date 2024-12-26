import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import pool from '../db/connection.js';

export const studentLogin=async(req,res)=>{
    const { username, password } = req.body;
    
  try {
    const [rows] = await pool.query(
      "SELECT * FROM student WHERE username = ?",
      [username]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = rows[0];

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid password" });
    }

    generateToken(res, user, "student", `Welcome back, ${user.name}`);
    
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}

export const studentRegister = async (req, res) => {
    const { username, email, password,usn,name,department_id,counsellor_id } = req.body;
  
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