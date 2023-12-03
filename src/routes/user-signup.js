import { Router } from "express";

const router = Router();



router.post('/', (req, res) => {
	const { username, email, password, mobile_number } = req.body;
  
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
		  username,
		  email,
		  password_hash: /* I'm gonna use bcrypt to hash the password here*/,
		  mobile_number,
		  is_email_verified: false,
		  created_at: new Date(),
		  updated_at: new Date(),
		};
  
		db.query('INSERT INTO Users SET ?', user, (insertErr) => {
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
  
  app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
  });
export default router;