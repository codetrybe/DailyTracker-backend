// db.js
import mysql from "mysql"
import dotenv from "dotenv"
import { promisify } from "util"
dotenv.config()


// Create a connection to the database
const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DB,
});


connection.connect = promisify(connection.connect);
connection.query = promisify(connection.query);


// create an asycn MySQL connection function
const connectDb = async () => {
	try{
		const result = await connection.connect()
		console.log("Successfully connected to the database.");
		//console.log(result)
	}catch (error){
		throw error;
	}
}



// Open the MySQL connection
await connectDb();


export default connection;