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
        const userId = req.user.userId; // Extracted from the authenticated user's token
        // console.log(req.user);
        // Fetch student details from the database
        const [rows] = await pool.query(
          "SELECT name, email, username FROM counsellor WHERE cid = ?",
          [userId]
        );
        const [rows2] = await pool.query(
            "SELECT usn,name, email, department_id FROM student WHERE counsellor_id = ?",
            [userId]
          );
        if (rows.length === 0) {
          return res.status(404).json({ success: false, message: "counsellor not found" });
        }
    
        const counsellor = rows[0];
        const students = rows2[0];
        return res.status(200).json({ success: true, counsellor,students });
      } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
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