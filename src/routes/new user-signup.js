import { Router } from "express";
import { hashPassword } from "../utils/helpers/bcrypt.helper.js";
import db from "../config/db.js";
import { v4 as uuid } from "uuid";

const router = Router();



router.post('/', async(req, res) => {
	const { fullname,
		username,
		email,
		password_hash,
		phone,
		phone2,
		location,
		profile_pic } = req.body;
  
	// Check if the email already exists in the database
	db.query('SELECT * FROM users WHERE email = ?', [email], async (selectErr, results) => {
        try {
            let response = results;
            if (response.length > 0){
                // there is already a user with the email in the req.body;
               return res.status(401).json({ error: 'User already exists in the database' });
            }
                // there is no previous user and the user object to be inserted can be created;

            const hashed = await hashPassword(password_hash)
            const user = {
              user_id: uuid(),
              fullname,
              username,
              email,
              password_hash: hashed,
              phone,
              phone2,
              location,
              profile_pic
            };

            // here is a try-catch for inserting the data

            try {
                db.query('INSERT INTO users(user_id, fullname, username, email, password_hash, phone, phone2, location, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [user.user_id, user.fullname, user.username, user.email, user.password_hash, user.phone, user.phone2, user.location, user.profile_pic]);
                console.log('User inserted into the database');
                
                const insertedUser = await db.query('SELECT * FROM users WHERE user_id = ?', [user.user_id]);
                     return res.status(201).json(insertedUser);
            } 
            
            catch (error) {
                // error inserting
                console.error("MySQL insertion error");
                return res.status(500).json({error: "Internal Server Error"});
            }
        } 
        
        catch (error) {
            // there was an error in the selection
            console.error('MySQL selection error:', selectErr);
		    res.status(500).json({ error: 'Internal Server Error' });
        }
	});
  });

export default router;