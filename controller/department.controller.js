import pool from '../db/connection.js';

export const getDepartment=async(req,res)=>{
    try{
        const [rows] = await pool.query(
            "SELECT * FROM department"
          );
          const departments=rows;
          return res.status(200).json({ success: true, message: "List Of All Departments",departments});
    }catch (error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to Get Departments"
        })
    }
}