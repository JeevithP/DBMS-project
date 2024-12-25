import express from 'express';
import cookieParser from "cookie-parser";
import studentRoute from "../server/routes/students.route.js"
import counsellorRoute from "../server/routes/counsellors.route.js"
import clubRoute from "../server/routes/clubs.route.js"

// Initialize the app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/student",studentRoute);
app.use("/api/v1/counsellor",counsellorRoute);
app.use("/api/v1/counsellor",clubRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});