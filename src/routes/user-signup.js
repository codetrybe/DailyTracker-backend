import { Router } from "express";
import { hashPassword } from "../utils/helpers/bcrypt.helper";

const router = Router();



router.post('/', (req, res) => {
	const { fullname,
		username,
		email,
		password_hash,
		phone,
		phone2,
		location,
		profile_pic } = req.body;
  
	// Check if the email already exists in the database
	db.query('SELECT * FROM Users WHERE email = ?', [email], (selectErr, results) => {
	  if (selectErr) {
		console.error('MySQL selection error:', selectErr);
		res.status(500).json({ error: 'Internal Server Error' });
	  } else if (results.length > 0) {
		// User with the same email already exists
		res.status(401).json({ error: 'User already exists in the database' });
	  } else {
		// There is no previous record of the email
		// Insert user into the database
		const user = {
		  fullname,
		  username,
		  email,
		  password_hash: hashPassword(password_hash),
		  phone,
		  phone2,
		  location,
		  profile_pic
		};
  
		db.query('INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)', user, (insertErr) => {
		  if (insertErr) {
			console.error('MySQL insertion error:', insertErr);
			res.status(500).json({ error: 'Internal Server Error' });
		  } else {
			console.log('User inserted into the database');
			res.status(201).json({ message: 'User registered successfully' });
		  }
		});
	  }
	});
  });

export default router;