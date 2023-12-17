import database from "../config/db.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv"
import tryCatch from "../utils/libs/tryCatch.js";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";
dotenv.config()

const query = promisify(database.query).bind(database)
const secret_key = process.env.secret_key


export const forgotpassword = tryCatch(async (req, res) => {
   const { email } = req.body;
   const user = await query(`SELECT * FROM users WHERE email = ?`,[email]);

   if (!user[0]){
     return errorResponse(res, "No user found for this email", StatusCodes.BAD_REQUEST);
   }
// Generate OTP TO SEND TO THE USER
	const otp = speakeasy.totp({
		secret: speakeasy.generateSecret().base32,
		encoding: "base32",
	  });

	// Set OTP expiration (e.g., 5 minutes from now)
	const expiration = new Date();
	expiration.setMinutes(expiration.getMinutes() + 60);

	// Save OTP and expiration in the database
	await queryPromise(
		"INSERT INTO otp(user_id, otp, expired_at) VALUES (?, ?, ?)",
		[user.user_id, otp, expiration]
	  );

	// now we can send OTP to users email
	await sendEmail(email, "OTP for Registration", `<h1>Your OTP for registration is: ${otp}</h1>. <br>It will expire in 5 minutes.`);

  return successResponse(res, "Email sent successfully", {});

})

/**
 * TODO:
 * - Add endpoint to verify OTP
 * - Generate JWT token
 * - Add JWT token to response
 */




// const getemail = async (req, res) => {

//   //function to get email and post the required data
//   // res.render(some template to get email field)

//   // verify email field is not empty
//   // then post to same route

// }

// const generatetoken = async (req, res) => {
//   // function to generate token and forward generated token
  
//   // grab the email from the request body
//   const { email } = req.body;

//   // verify email is not empty
//   if (!email){
//     return res.status(404).send('email field can not be empty');
//   }

//   // attempt to get user and verify if email is mapped to a valid user in the database
//   const user = await query(`SELECT * FROM users WHERE email = ?`,[email]);

//   if (!user[0]){
//     return res.status(404).send('No user found for this email');
//   }

//   // generate a secret key to be used to ensure token to be generated can only be used when the password has not been modified 
//   const secret = secret_key + user[0].password_hash;

//   // generate a payload to be signed and passed along with a token to be generated
//   const payload = { id : user[0].user_id, email : user[0].email };

//   // generate a signed token encoding the payload, the secret, and expiring time with jsonwebtoken
//   const token = jwt.sign(payload, secret, {expiresIn:"10m"});

//   const link = `http://localhost:${process.env.PORT || 3000}/v1/resetpassword/${user[0].user_id}/${token}`
//   console.log(link)


  
//   return res.json(user[0])
// }

// export default { getemail, generatetoken }