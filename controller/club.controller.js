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
            [name, username, hashedPassword]
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
        const [temp] = await pool.query(
            "SELECT * FROM events WHERE club_id = ?",
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "club not found" });
        }

        const club = rows[0];
        const events = temp[0];
        return res.status(200).json({ success: true, club,events });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}
export const addEvent = async (req, res) => {
    try {
        const clubId = req.user.userId;
        const { name, points, description,date } = req.body;

        if(!name || !points || !description || !date){
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }
        const [rows] = await pool.query("INSERT INTO events (name,points,club_id, description,date) VALUES (?, ?, ?,?,?)", [
            name, points, clubId, description,date
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
export const delEvent = async (req, res) => {
    const { eid } = req.body; // Use event ID for precise identification
    const clubId = req.user.userId; // Ensure only authorized clubs can delete their events

    if (!eid) {
        return res.status(400).json({
            success: false,
            message: "Event ID must be provided",
        });
    }

    try {
        // Delete the specific event by its ID and the club ID
        const [result] = await pool.query("DELETE FROM events WHERE eid = ? AND club_id = ?", [
            eid, clubId
        ]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found or you are not authorized to delete it",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event deleted successfully",
        });
    } catch (error) {
        console.error("Failed to delete event,", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const clubId = req.user.userId; // Ensure only authorized clubs can update their events
        const { eid } = req.body; // Event ID to update

        // Fields to update
        const { name, points, description, date } = req.body;

        if (!eid) {
            return res.status(400).json({
                success: false,
                message: "Event ID must be provided",
            });
        }

        // Dynamically build the SET part of the SQL query
        const updates = [];
        const values = [];

        if (name) {
            updates.push("name = ?");
            values.push(name);
        }
        if (points) {
            updates.push("points = ?");
            values.push(points);
        }
        if (description) {
            updates.push("description = ?");
            values.push(description);
        }
        if (date) {
            updates.push("event_date = ?");
            values.push(date);
        }

        // If no fields are provided to update, return an error
        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided to update",
            });
        }

        // Add event ID and club ID to the values array
        values.push(eid, clubId);

        // Construct the SQL query
        const query = `UPDATE events SET ${updates.join(", ")} WHERE eid = ? AND club_id = ?`;

        // Execute the query
        const [result] = await pool.query(query, values);

        // Check if any rows were updated
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Event not found or you are not authorized to update it",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Event updated successfully",
        });
    } catch (error) {
        console.error("Failed To Update Event,", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const getStudents=async(req,res)=>{
    const {eid}=req.body;
    const clubId = req.user.userId;

    if(!eid){
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }
    try{
        const [rows] = await pool.query("SELECT * FROM event_student WHERE event_id=?", [
            eid
        ])
        return res.status(200).json({
            success: true,
            message: "Students Returned successfully",
        });
    }catch(error){
        console.error("Failed To Get Students ,", error);
        res.status(500).json({ success: false, message: "Server error" })
    }
}
export const verifyStudent = async (req, res) => {
    const { eid, sid } = req.body;
    const clubId = req.user.userId; // Club admin's ID for context, if needed

    // Validate input
    if (!eid || !sid) {
        return res.status(400).json({
            success: false,
            message: "All required fields must be provided",
        });
    }

    try {
        // Update the approved field in the event_student table
        const [result] = await pool.query(
            "UPDATE event_student SET approved = true WHERE event_id = ? AND student_id = ? AND approved = false",
            [eid, sid]
        );

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "No matching unapproved entry found for the given event and student",
            });
        }

        // Success response
        return res.status(200).json({
            success: true,
            message: "Student's event approval status updated successfully",
        });
    } catch (error) {
        console.error("Failed To Verify Student:", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

