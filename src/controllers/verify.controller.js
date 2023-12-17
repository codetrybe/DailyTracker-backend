import tryCatch from '../utils/libs/tryCatch.js';
import db from '../config/db.js';
import { StatusCodes } from 'http-status-codes';
import util from 'util';
import { errorResponse, successResponse } from '../utils/libs/response.js';

// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

export const verifyEmail = tryCatch(async (req, res) => {
	const {otp} = req.body;

	const findOtp = await queryPromise(
		"SELECT * FROM otp WHERE otp = ?", [otp]
	)
	if (findOtp.length == 0) {
		return errorResponse(res, "Invalid OTP", StatusCodes.BAD_REQUEST);
	}
	// check if otp has expired
	if (findOtp[0].expired_at < new Date()) {
		return errorResponse(res, "OTP has expired, please request a new one", StatusCodes.BAD_REQUEST);
	}
	// update the otp status to active
	await queryPromise(
		"UPDATE otp SET status = 'active' WHERE otp = ?", [otp]
	)
	// update the user is_email_verified to true
	await queryPromise(
		"UPDATE users SET is_email_verified = true WHERE user_id = ?", [findOtp[0].user_id]
	)

	/**
	 * TODO:
	 * - Delete OTP from database
	 * - Generate JWT token
	 * - Add JWT token to response
	 */

	return successResponse(res, "Email verified successfully", {});
})

//**TODO
// - Add endpoint to request a new OTP
// */