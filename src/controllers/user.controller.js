import { StatusCodes } from "http-status-codes";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import tryCatch from "../utils/libs/tryCatch.js";
import db from "../config/db.js";
import util from "util";
import { removePasswordFromUser } from "../utils/helpers/user.helper.js";
import { comparePassword, hashPassword } from "../utils/helpers/bcrypt.helper.js";
import { deleteFromTable, selectFromTable, updateTable } from "../config/sql.js";

// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

const tableName = 'users';

/**
 * Get user Profile
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const getUser = tryCatch(async (req, res) => {
	// const {user_id} = req.params;
  const { user_id } = req.app.get("user");
	// const userQuery = "SELECT * FROM users WHERE user_id = ?";
	// const user = await queryPromise(userQuery, [user_id]);

  const condition = `user_id = ${user_id}` 
  const user = await selectFromTable(tableName, '*', condition)

	if (user.length === 0) {
		return errorResponse(res, "User not found", StatusCodes.NOT_FOUND);
	}

	return successResponse(res, "User Retrieved Successfully", {data: removePasswordFromUser(user[0])});
})

/**
 * Update User Profile
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const updateUser = tryCatch(async (req, res) => {
  // const { user_id } = req.params;
  const { user_id } = req.app.get("user");
  const restrictedFields = [
    "user_id",
    "username",
    "email",
	  "password_hash",
    "is_email_verified",
    "is_phone_verified",
    "created_at",
    "updated_at",
  ];
  const requestBody = req.body;

  const newDetails = (restrictedFields, requestBody) => {
    if (requestBody) {
      restrictedFields.forEach((field) => {
        delete requestBody[field];
      });
    }
    return requestBody;
  };

  // check if user is in db
  // Unwrap user object from query-returned array, for easy access of user properties.
  // const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  // const user = await queryPromise(checkUserQuery, [user_id]);

  const condition = `user_id = ${user_id}`
  const user = await selectFromTable(tableName, '*', condition)

  if (user.length === 0) {
    return errorResponse(res, "User not found", StatusCodes.NOT_FOUND);
  }

  // Update allowed fields if user is found
  const updateQuery = "UPDATE users SET ? WHERE user_id = ?";
  await queryPromise(updateQuery, [
    newDetails(restrictedFields, requestBody),
	user_id,
  ]);

  return successResponse(res, "User details updated successfully");
});

/**
 * Change User Password
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const changePassword = tryCatch(async (req, res) => {
  // const { user_id } = req.params;
  const { user_id } = req.app.get("user");
  const { oldPassword, newPassword, confirmPassword } = req.body;
  // const userQuery = "SELECT * FROM users WHERE user_id = ?";
  // const user = await queryPromise(userQuery, [user_id]);

  const user = await selectFromTable(tableName, '*', `user_id = ${user_id}`)

  if (user.length === 0) {
    return errorResponse(res, "User not found", StatusCodes.NOT_FOUND);
  }
//   check if old password is correct
const passwordCheck = await comparePassword(oldPassword, user[0].password_hash)
  if (!passwordCheck) {
	return errorResponse(res, "Old password is incorrect", StatusCodes.BAD_REQUEST);
  }
//   check if new password is same as old password
  if (oldPassword === newPassword) {
	return errorResponse(res, "New password cannot be same as old password", StatusCodes.BAD_REQUEST);
  }
//   check if new password and confirm password is same
  if (newPassword !== confirmPassword) {
	return errorResponse(res, "New password and confirm password must be same", StatusCodes.BAD_REQUEST);
  }
  const hashedPassword = await hashPassword(newPassword);
//   update password
  // const updateQuery = "UPDATE users SET password_hash = ? WHERE user_id = ?";
  // await queryPromise(updateQuery, [hashedPassword, user_id]);
  const fieldsToUpdate = [
    { field: 'password_hash', value: hashedPassword }
  ]
  const condition = ['user_id', user_id]
  await updateTable(tableName, fieldsToUpdate, condition)

  return successResponse(res, "Password changed successfully");

})

/**
 * Delete User Account
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const deleteUser = tryCatch(async (req, res) => {
  // const { user_id } = req.params;
  const { user_id } = req.app.get("user");
  // const userQuery = "SELECT * FROM users WHERE user_id = ?";
  // const user = await queryPromise(userQuery, [user_id]);
  const user = await selectFromTable(tableName, '*', `user_id = ${user_id}`)

  if (user.length === 0) {
	return errorResponse(res, "User not found", StatusCodes.NOT_FOUND);
  }
  
  // const deleteQuery = "DELETE FROM users WHERE user_id = ?";
  // await queryPromise(deleteQuery, [user_id]);

  await deleteFromTable(tableName, `user_id = ${user_id}`)

  return successResponse(res, "user account deleted successfully");
});