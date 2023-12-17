import { StatusCodes } from "http-status-codes";
import db from "../config/db.js";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import tryCatch from "../utils/libs/tryCatch.js";
import { hashPassword } from "../utils/helpers/bcrypt.helper.js";
import { v4 as uuid } from "uuid";
import util from "util";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import jwt from 'jsonwebtoken';
// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

// create a transporter for dailytracker email
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
	  user: "<dailytrackeremail>@gmail.com",
	  pass: "<dailytrackerpassword>", 
	},
  });


export const register = tryCatch(async (req, res) => {
	const errors = validationResult(req);
	// checks for validation errors
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	  }
	//   if no errors, continue with the rest of the code;
	const {
		fullname,
		username,
		email,
		password_hash,
		phone,
		phone2,
		location,
		profile_pic,
	} = req.body;

	// Check if the email already exists in the database
	const existingUser = await queryPromise(
		"SELECT * FROM users WHERE email = ?", [email] 
	)
	if (existingUser.length > 0) {
		return errorResponse(res, "User already exists in the database", StatusCodes.CONFLICT);
	}
	const hashed = await hashPassword(password_hash);
	const user = {
		user_id: uuid(),
		fullname,
		username,
		email,
		password_hash: hashed,
		phone,
		phone2,
		location,
		profile_pic,
	};

	const newUser = await queryPromise("INSERT INTO users(user_id, fullname, username, email, password_hash, phone, phone2, location, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [user.user_id, user.fullname, user.username, user.email, user.password_hash, user.phone, user.phone2, user.location, user.profile_pic]);
	// Generate OTP TO SEND TO THE USER
	const otp = speakeasy.totp({
		secret: speakeasy.generateSecret().base32,
		encoding: "base32",
	  });

	// Set OTP expiration (e.g., 5 minutes from now)
	const expiration = new Date();
	expiration.setMinutes(expiration.getMinutes() + 5);


	// we have to create a table for OTP records
	// this table should have a secondary key (userID)
	// it should have id, userID, OTP, expiration

	// Save OTP and expiration in the database
	await queryPromise(
		"INSERT INTO otp_records(user_id, otp, expiration) VALUES (?, ?, ?)",
		[user.user_id, otp, expiration]
	  );

	// now we can send OTP to users email

	const mailOptions = {
		from: "<dailyTrackeremail>@gmail.com",
		to: email , // email is destructured from the user
		subject: "OTP for Registration",
		text: `Your OTP for registration is: ${otp}. It will expire in 5 minutes.`,
	  };

	  transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
		  console.error(error);
		  return errorResponse(res, "Failed to send OTP", StatusCodes.INTERNAL_SERVER_ERROR);
		}
	
		console.log("Email sent: " + info.response);
		successResponse(res, "User registered successfully. OTP sent to email.", {}, StatusCodes.CREATED);
	  });

	  // use jwt to send a payload containing the user_id of the just registered user

	  const payload = {
		user:{
			id:user.user_id
		}
	}

	try{
		const token = await jwt.sign(payload,
			 process.env.SECRET_KEY, //process.env.SECRET_KEY
			 {expiresIn: 3600 * 24})
		res.status(201).json({token});
	}
	catch(err){
		res.status(500).send("jwt error")
	}
	/**
	 * TODO:
	 * - Generate OTP
	 * - Send OTP to user email
	 * - Save OTP in database (keep track of the OTP expiration time)
	 * - Generate JWT token
	 * - Add JWT token to response
	 */

	// return successResponse(res, "User registered successfully", {}, StatusCodes.CREATED);

});
