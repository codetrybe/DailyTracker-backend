// db.js
import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

// Create a connection to the database
const connection = mysql.createConnection({
	host: process.env.DB_HOST || "localhost",
	user: process.env.DB_USER || "whyte",
	password: process.env.PASSWORD || "pa55w0rd",
	database: process.env.DB || "DailyTracker",
});

// Open the MySQL connection
connection.connect((error) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

export default connection;
