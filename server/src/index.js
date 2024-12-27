const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Parse data as JSON instead of string
app.use(express.json());

app.use("/student", studentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the DBMS Project!");
});

app.listen(3000, () => {
    console.log("Server ready @ localhost:3000");
});
