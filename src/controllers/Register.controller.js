import { StatusCodes } from "http-status-codes";
import db from "../config/db.js";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import tryCatch from "../utils/libs/tryCatch.js";
import { hashPassword } from "../utils/helpers/bcrypt.helper.js";
import { v4 as uuid } from "uuid";
import util from "util"

// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

export const register = tryCatch(async (req, res) => {
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

	/**
	 * TODO:
	 * - Generate OTP
	 * - Send OTP to user email
	 * - Save OTP in database (keep track of the OTP expiration time)
	 * - Generate JWT token
	 * - Add JWT token to response
	 */

	return successResponse(res, "User registered successfully", {}, StatusCodes.CREATED);
});
