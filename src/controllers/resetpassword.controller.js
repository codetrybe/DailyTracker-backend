import database from "../config/db.js";
import { promisify } from "util";
import bcrypt from "bcrypt";



const query = promisify(database.query).bind(database);

const getpassword = (req, res) => {
  //function to to render template to get new password upon get request to this route

  //grab id and token for request parameter
  const { user_id } = req.params;
  // render a template to get password1 and passord2
  // get password1 data
  // get password2 data
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

  //grab the id data passed along the request parameter
  const { user_id } = req.params; //get user id from the generated token

  // verify if the user_id is mapped to a valid user
  const user = await query (`SELECT * FROM users WHERE user_id = ?`,[user_id])

  if (!user[0]){
    return res.send('user is not found')
  }

    // compare the passwords grabbed from the request body if the are same
  if (password !== password2){
    return res.send('passwords must match')
  }

  //harsh new password
  let newpassword = await bcrypt.hash(password, 10);

  // update the password in the database
  await query(`UPDATE users SET password_hash = ? WHERE user_id = ${user[0].user_id}`,[newpassword])

  res.send('Your password has been reset, try logging in again with your new password')

}

export default { getpassword, setpassword }


