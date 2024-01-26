import { StatusCodes } from "http-status-codes"
import { errorResponse } from "../../utils/libs/response.js"
import { verifyToken } from "../../utils/helpers/jwt.helper.js"
import util from "util";
import db from "../../config/db.js";

// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

/**
 * Middleware function for user authentication.
 * @param  req - the request object
 * @param  res - the response object
 * @param  next - the next function to be called
 * @return void | errorResponse
 */
export const userAuth = async(req, res, next) => {
	const authHeader = req.headers.authorization
	if (!authHeader || !authHeader.startsWith("Bearer")) {
		return errorResponse(res, "Authorization Header missing", StatusCodes.UNAUTHORIZED)
	}
	const token = authHeader.split(" ")[1]
	if (!token) {
		return errorResponse(res, "Authorization Token missing", StatusCodes.UNAUTHORIZED)
	}

	try {
		const decodedToken = verifyToken(token)
		if (!('userId' in decodedToken)) {
			return errorResponse(res, "Invalid Authorization Token", StatusCodes.UNAUTHORIZED)
		}

		const user = await queryPromise('SELECT * FROM users WHERE user_id = ?', [decodedToken.userId]);
		if (user.length === 0) {
			return errorResponse(res, "The user does not exist", StatusCodes.NOT_FOUND)
		}
		console.log(user[0])
		req.app.set("user", user[0]);		
		next();
	} catch (error) {
		console.log(error)
		return errorResponse(res, "Invalid Authorization Token", StatusCodes.UNAUTHORIZED);
	}
};
