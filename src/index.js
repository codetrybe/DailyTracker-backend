import mysql from "mysql";

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'CHUrabrady123@',
  });

  db.connect((err) => {
	if (err) {
	  console.error('MySQL connection error:', err);
	} else {
	  console.log('Connected to MySQL database');
	}})