import { StatusCodes } from "http-status-codes"
import { errorResponse } from "../../utils/libs/response"
import { verifyToken } from "../../utils/helpers/jwt.helper"

/**
 * Middleware function for user authentication.
 * @param  req - the request object
 * @param  res - the response object
 * @param  next - the next function to be called
 * @return void | errorResponse
 */
export const userAuth = (req, res, next) => {
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
		// TODO: validate if token exist in db and is not expired
		// TODO: get user from db and attach to req object
	req.app.set("user", decodedToken); // this should be user object or any other thing you might want to save in the request object		next();
	} catch (error) {
		return errorResponse(res, "Invalid Authorization Token", StatusCodes.UNAUTHORIZED);
	}
}