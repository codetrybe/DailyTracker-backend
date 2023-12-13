import database from "../config/db.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv"
dotenv.config()

const query = promisify(database.query).bind(database)
const secret_key = process.env.secret_key


const getemail = async (req, res) => {

  //function to get email and post the required data
  // res.render(some template to get email field)

  // verify email field is not empty
  // then post to same route

}

const generatetoken = async (req, res) => {
  // function to generate token and forward generated token
  
  // grab the email from the request body
  const { email } = req.body;

  // verify email is not empty
  if (!email){
    return res.status(404).send('email field can not be empty');
  }

  // attempt to get user and verify if email is mapped to a valid user in the database
  const user = await query(`SELECT * FROM users WHERE email = ?`,[email]);

  if (!user[0]){
    return res.status(404).send('No user found for this email');
  }

  // generate a secret key to be used to ensure token to be generated can only be used when the password has not been modified 
  const secret = secret_key + user[0].password_hash;

  // generate a payload to be signed and passed along with a token to be generated
  const payload = { id : user[0].user_id, email : user[0].email };

  // generate a signed token encoding the payload, the secret, and expiring time with jsonwebtoken
  const token = jwt.sign(payload, secret, {expiresIn:"10m"});

  const link = `http://localhost:${process.env.PORT || 3000}/v1/resetpassword/${user[0].user_id}/${token}`
  console.log(link)


  
  return res.json(user[0])
}

export default { getemail, generatetoken }