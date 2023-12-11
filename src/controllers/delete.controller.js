import { successResponse } from "./utils/libs/response.js";
import db from "./config/db.js";
import tryCatch from "../utils/libs/tryCatch.js";
import util from "util";

// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

export const deleteUser = tryCatch(async (req, res) => {
	let user_id = req.params.id;
	let sql = `DELETE FROM users WHERE user_id=${user_id}`;
	/**
	 * TODO:
	 * - find user by user_id
	 */
	await queryPromise(sql);

	return successResponse(res, "user account deleted successfully");

})

