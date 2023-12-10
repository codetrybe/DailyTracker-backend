import { generateToken } from "../../utils/helpers/jwt.helper"
import {comparePassword} from "../../utils/helpers/bcrypt.helper"
import db from "../../config/db.js"

class User{
      async login(req, res) {
        try {
          const { email, username , password } = req.body;
            
          const emailorUsername = email || username;
          // Validate if email/username and password are provided
          if (!emailorUsername || !password) {
            return res.status(400).json({ message: 'Please provide both email and password.' });
          }
    
          // Find the user with the given email in the database
          const selectUserQuery = 'SELECT * FROM users WHERE email = ? OR username = ?';
          db.query(selectUserQuery, [emailorUsername, emailorUsername], async (error, results) => {
            if (error) {
              return res.status(500).json({ message: 'Invalid email or password.' });
            }
    
            const user = results[0];
    
            // Check if the user with the given email exists
            if (!user) {
              return res.status(401).json({ message: 'Invalid email or password.' });
            }
    
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await comparePassword(password, user.password);
    
            if (passwordMatch) {
              // Passwords match, generate a JWT token for the user
              const token = generateToken({ userId: user.id, email: user.email });
              res.status(200).json({ message: 'Login successful', token });
            } else {
              res.status(401).json({ message: 'Invalid email or password.' });
            }
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal server error.' });
        }
      }

      
}

export default User;



