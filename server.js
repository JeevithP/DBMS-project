import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import studentRoute from "../server/routes/students.route.js"
import counsellorRoute from "../server/routes/counsellors.route.js"
import clubRoute from "../server/routes/clubs.route.js"
import departmentRoute from "../server/routes/department.route.js"

// Initialize the app
const app = express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/student",studentRoute);
app.use("/api/v1/counsellor",counsellorRoute);
app.use("/api/v1/club",clubRoute);
app.use("/api/v1/department",departmentRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});