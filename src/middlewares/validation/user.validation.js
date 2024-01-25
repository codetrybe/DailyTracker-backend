import { body, validationResult } from "express-validator";
import { errorResponse } from "../../utils/lib/response.js";
import { StatusCodes } from "http-status-codes";

const errorFormatter = ({ msg }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return msg;
};

/**
 * Validate user registration request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const registerValidator = async (req, res, next) => {
	const fullNameCheck = body("fullName", "FullName is required and must be at least 4 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .run(req);
  const userNameCheck = body("userName", "UserName is required and must be at least 3 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 3 })
    .run(req);
  const emailCheck = body("email", "Invalid email address")
    .isEmail()
    .normalizeEmail()
    .run(req);
  const passwordCheck = body("password_hash", "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .run(req);
  await Promise.all([fullNameCheck, userNameCheck, emailCheck, passwordCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
	return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate user login request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const loginValidator = async (req, res, next) => {
  const emailCheck = body("email", "Invalid email address")
    .optional()
    .isEmail()
    .normalizeEmail()
    .run(req);
  const usernameCheck = body("username", "username is required")
    .optional()
    .trim()
    .notEmpty()
    .run(req);
  const passwordCheck = body("password_hash", "Password must be at least 8 characters")
    .trim()
    .isLength({ min: 8 })
    .run(req);
  await Promise.all([emailCheck, usernameCheck, passwordCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate user update request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const updateValidator = async (req, res, next) => {
  const fullNameCheck = body("fullName", "FullName is required and must be at least 4 characters")
    .optional()
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .run(req);
  
  const phoneNumberCheck = body("phone", "PhoneNumber is required")
    .optional()
    .isMobilePhone()
    .run(req);
  
  await Promise.all([fullNameCheck, phoneNumberCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(", "), StatusCodes.BAD_REQUEST);
  }
  next();
}