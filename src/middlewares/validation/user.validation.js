import { body, validationResult } from "express-validator";
import { errorResponse } from "../../utils/libs/response.js";
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
	const fullNameCheck = body("fullname", "FullName is required and must be at least 4 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .run(req);
  const userNameCheck = body("username", "UserName is required and must be at least 3 characters")
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
    const phoneNumberCheck = body("phone", "PhoneNumber must be in a valid format")
    .optional()
    .isMobilePhone()
    .run(req);
  const phoneNumber2Check = body("phone2", "PhoneNumber must be in a valid format")
    .optional()
    .isMobilePhone()
    .run(req);

  await Promise.all([fullNameCheck, userNameCheck, emailCheck, passwordCheck, phoneNumberCheck, phoneNumber2Check]);
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
};

/**
 * Validate user password change request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const changePasswordValidator = async (req, res, next) => {
  const oldPasswordCheck = body("password_hash", "Password must be atleast 8 characters")
    .trim()
    .isLength({ min: 8 })
    .run(req);
  const newPasswordCheck = body("new_password", "Password must be atleast 8 characters")
    .trim()
    .isLength({ min: 8 })
    .run(req);
  const confirmPasswordCheck = body("confirm_password", "Password must be atleast 8 characters")
    .trim()
    .isLength({ min: 8 })
    .run(req);

  await Promise.all([oldPasswordCheck, newPasswordCheck, confirmPasswordCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

// Task validations

/**
 * Validate add task request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const addTaskValidator = async (req, res, next) => {
  const taskNameCheck = body("task_name", "TaskName is required and must be at least 4 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 4})
    .run(req);

  await Promise.all([taskNameCheck])
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate edit task request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const editTaskValidator = async (req, res, next) => {
  const taskNameCheck = body("task_name", "TaskName is required")
    .trim()
    .notEmpty()
    .run(req);

  await Promise.all([taskNameCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

// Todo Validations

/**
 * Validate Create Todo request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const createTodoValidator = async (req, res, next) => {
  const listNameCheck = body("list_name", "ListName is required and must be at least 4 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .run(req);

  await Promise.all([listNameCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate Create Todo request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const updateTodoValidator = async (req, res, next) => {
  const listNameCheck = body("list_name", "ListName is required and must be at least 4 characters")
    .optional()
    .trim()
    .notEmpty()
    .isLength({ min: 4 })
    .run(req);
  const timeScheduledCheck = body("time_scheduled", "TimeScheduled is required and must be a valid date")
    .isDate()
    .optional()
    .run(req);

  await Promise.all([listNameCheck, timeScheduledCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate Users verify email request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const verifyEmailValidator = async (req, res, next) => {
  const otpCheck = body("otp", "otp is required and must be exactly 6 characters")
    .trim()
    .notEmpty()
    .isLength({ min: 6, max: 6})
    .run(req);

  await Promise.all([otpCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate resend email verification request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const resendOtpValidator = async (req, res, next) => {
  const emailCheck = body("email", "Invalid email address")
    .isEmail()
    .normalizeEmail()
    .run(req);

  await Promise.all([emailCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate forgot password request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const forgotPasswordValidator = async (req, res, next) => {
  const emailCheck = body("email", "Invalid email address")
    .isEmail()
    .normalizeEmail()
    .run(req);

  await Promise.all([emailCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};

/**
 * Validate reset password request body
 * @param  req - The request object
 * @param  res - The response object
 * @returns errorResponse | NextFunction
 */
export const resetPasswordValidator = async (req, res, next) => {
  const newPasswordCheck = body("new_password", "Password must be atleast 8 characters")
    .trim()
    .isLength({ min: 8 })
    .run(req);

  const confirmPasswordCheck = body("confirm_password", "Password must be atleast 8 characters")
    .trim()
    .isLength({ min: 8 })
    .run(req);

  await Promise.all([newPasswordCheck, confirmPasswordCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};