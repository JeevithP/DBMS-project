// connection.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Create a connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "krish",
    password: "krish",
    database: "dbms_project",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Export the pool
export default pool;
