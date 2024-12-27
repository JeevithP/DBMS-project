import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import pool from '../db/connection.js';

export const clubLogin = async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }
    try {
        const [rows] = await pool.query(
            "SELECT * FROM club WHERE username = ?",
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

        generateToken(res, user, "club", `Welcome back, ${user.name}`);

    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const clubRegister = async (req, res) => {
    const { name, username, password } = req.body;

    if(!name || !username || !password){
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }
    try {
        // Check if the username or email already exists
        const [existingUsers] = await pool.query(
            "SELECT * FROM student WHERE username = ? OR name = ?",
            [username, name]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Username or ClubName already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new student into the database
        const [result] = await pool.query(
            "INSERT INTO club (name,username, password) VALUES (?, ?, ?)",
            [name, username, password]
        );

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "Club registered successfully",
            clubId: result.insertId, // Return the ID of the newly created student
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const clubLogout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged Out Successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}
export const getClubProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Extracted from the authenticated user's token
        // console.log(req.user);
        // Fetch student details from the database
        const [rows] = await pool.query(
            "SELECT name, username FROM club WHERE cid = ?",
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "club not found" });
        }

        const club = rows[0];
        return res.status(200).json({ success: true, club });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
export const addEvent = async (req, res) => {
    try {
        const clubId = req.user.userId;
        const { name, points, description } = req.body;

        if(!name || !points || !description){
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }
        const [rows] = await pool.query("INSERT INTO events (name,points,club_id, description) VALUES (?, ?, ?,?)", [
            name, points, clubId, description
        ])
        const event=rows[0];
        return res.status(201).json({
            success: true,
            message: "Event Added successfully",
            event // Return the ID of the newly created student
        });
    } catch (error) {
        console.error("Failed To Add Event ,", error);
        res.status(500).json({ success: false, message: "Server error" });
    }

}
export const delEvent=async(req,res)=>{
    const {name}=req.body;
    const clubId = req.user.userId;
    if(!name){
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }
    try{
        const [rows] = await pool.query("DELETE FROM events WHERE name=? AND club_id=?", [
            name, clubId
        ])
        return res.status(201).json({
            success: true,
            message: "Event Deleted successfully",
        });
    }catch(error){
        console.error("Failed To delete Event ,", error);
        res.status(500).json({ success: false, message: "Server error" })
    }
}