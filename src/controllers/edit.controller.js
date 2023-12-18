import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import tryCatch from "../utils/libs/tryCatch.js";
import db from "../config/db.js";
import util from "util";


// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);


export const update = tryCatch(async (req, res) => {

	const userId = req.params.userId;
	const newDetails = req.body;

	// check if user is in db
	const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
	const user = await queryPromise(checkUserQuery, [userId]);

	if (user.length === 0) {
		return errorResponse(res, "User not found", StatusCodes.NOT_FOUND);
	}

	// Update user info if found
	// updateQuery updates from one field to all fields in user profile matching user_id
	const updateQuery = "UPDATE users SET ? WHERE user_id = ?";
	await queryPromise(updateQuery, [newDetails, userId]);

	/**
	 * TODO:
	 * - What are the fields that can be updated?
	 * ---- All fields can be updated with the query
	 * - this updateQuery, can it update more than one field?
	 * ---- Yes, it can. It modifies the values if available, sets them if they are not set.
	 */

	return successResponse(res, "User details updated successfully", {});

})
