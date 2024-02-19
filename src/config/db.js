// db.js
import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

// Create a connection to the database
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.PASSWORD,
	database: process.env.DB,
	port: process.env.DBPORT
});

// Open the MySQL connection
connection.connect((error) => {
	if (error) throw error;
	console.log("Successfully connected to the database.");
});

export default connection;
