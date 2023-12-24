import { comparePassword } from "../utils/helpers/bcrypt.helper.js";
import { errorResponse } from "../utils/libs/response.js";
import db from "../config/db.js";
import util from "util";
import tryCatch from "../utils/libs/tryCatch.js";
import { generateToken } from '../utils/helpers/jwt.helper.js';

// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);


export const login = tryCatch(async (req, res) => {
	/**
	 * TODO:
	 * - you are required to login with email and password or username and password  and not both
	 * - the validation will be implemented in a middleware
	 */
	const { email, username, password } = req.body;

  //Takes care of instances where users use email or username
  const emailOrUsername = email || username
  
	// Find the user with the given email in the database
	const selectUserQuery =
		"SELECT * FROM users WHERE email = ? OR username = ?";
	const user = await queryPromise(selectUserQuery, [emailOrUsername, emailOrUsername])
	if (!user) {
		return errorResponse(res, "Invalid email or password", StatusCodes.UNAUTHORIZED);
	}
	const passwordMatch = await comparePassword(password, user[0].password_hash);

	if (!passwordMatch) {
		return errorResponse(res, "Invalid email or password", StatusCodes.UNAUTHORIZED);
	}

	/**
	 * TODO:
	 * - Generate JWT token
	 * - Add JWT token to response
	 */

  const token = generateToken({userId:user[0].user_id, email:user[0].email}, '1h')

	return successResponse(res, "Login successful", {token});
})