import database from "../config/db.js";
import { promisify } from "util";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()

const query = promisify(database.query).bind(database);
const secret_key = process.env.SECRET_KEY;

const getpassword = (req, res) => {
  //function to to render template to get new password upon get request to this route

  //grab id and token for request parameter
  const { id, token } = req.params;
  // render a template to get password1 and passord2
  //post data to the same route

}

const setpassword = async (req, res) => {
  // function to set the new password as the current password

  // grab the new password data passed along the request body
  const { password, password2 } = req.body

  // verify if password passed is not empty
  if (!password || !password2){
    return res.status(404).send("both fields are required")
  }

  //grab the id and token data passed along the request parameter
  const { id, token } = req.params;

  // verify if the id is mapped to a valid user
  const user = await query (`SELECT * FROM users WHERE user_id = ?`,[id])

  if (!user[0]){
    return res.send('user is not found')
  }

  // verify if the token passed through the request parameter is valid

  // generate same secret as generated in the generate token functiuonality  
  const secret = secret_key + user[0].password_hash;

  // compare to verify if token is same as the secret. token will be valid if password has not be modified or expiry time has not elapsed
  try{
    const payload = await jwt.verify(token, secret);
    
    // compare the passwords grabbed from the request body if the are same
    if (password !== password2){
      return res.send('passwords must match')
    }

    //harsh new password
    let newpassword = await bcrypt.hash(password, 10);

    // update the password in the database
    await query(`UPDATE users SET password_hash = ? WHERE user_id = ${user[0].user_id}`,[newpassword])

    res.send('Your password has been reset, try logging in again with your new password')
  }catch(error){
    res.send(error.message)
  }
  

}

export default { getpassword, setpassword }