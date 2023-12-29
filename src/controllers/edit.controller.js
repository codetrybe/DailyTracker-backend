import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import { hashPassword, comparePassword } from "../utils/helpers/bcrypt.helper.js";
import tryCatch from "../utils/libs/tryCatch.js";
import db from "../config/db.js";
import util from "util";

// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);


export const update = tryCatch(async (req, res) => {
	
	const userId = req.params.userId;
	const restrictedFields = ['user_id', 'username', 'email', 'is_email_verified','is_phone_verified', 'created_at', 'updated_at'];
	const requestBody = req.body;

	const newDetails = (restrictedFields, requestBody) => {
		
		if (requestBody) {
			restrictedFields.forEach((field) => {
				delete requestBody[field];
			})
		}
		return requestBody;
	
	}

	// check if user is in db
	// Unwrap user object from query-returned array, for easy access of user properties.
	const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
	const [user] = await queryPromise(checkUserQuery, [userId]);

	if (user.length === 0) {
		return errorResponse(res, "User not found", StatusCodes.NOT_FOUND);
	}

	// If password is provided in request body, Isolate it.
	if ('password_hash' in requestBody) {
		const newPassword = requestBody['password_hash'];
		delete requestBody['password_hash'];

		// Verify if new pass is same with current pass
		const { password_hash } = user;
		if (await comparePassword(newPassword, password_hash)) {
			return errorResponse(res, "Same password provided. Please use a different password", StatusCodes.BAD_REQUEST);
		}

		// Hash new pass and update the database with it
		const newPasswordHashed = await hashPassword(newPassword);
		const newQuery = "UPDATE users SET password_hash = ? WHERE user_id = ?";
		await queryPromise(newQuery, [newPasswordHashed, userId]);
	}

	// Update allowed fields if user is found
	const updateQuery = "UPDATE users SET ? WHERE user_id = ?";
	await queryPromise(updateQuery, [newDetails(restrictedFields, requestBody), userId]);

	/**
	 * TODO:
	 * - Set email verification for password update
	 */

	return successResponse(res, "User details updated successfully", {});

})
