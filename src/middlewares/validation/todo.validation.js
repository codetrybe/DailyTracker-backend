import { body, validationResult } from "express-validator";
import { errorResponse } from "../../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";

const errorFormatter = ({ msg }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return msg;
};

/**
 * TODO:
 * Create a new file for todo validations (todo.validation.js)
 */
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
  const timeScheduledCheck = body("time_scheduled", "TimeScheduled is required and must be a valid date")
    .trim()
    .notEmpty()
    .run(req);

  await Promise.all([listNameCheck, timeScheduledCheck]);
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
