import { body, validationResult } from "express-validator";
import { errorResponse } from "../../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";

const errorFormatter = ({ msg }) => {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return msg;
};

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
    const timeScheduledCheck = body("time_scheduled", "TimeScheduled is required and must be a valid date")
    .isDate()
    .run(req);

  await Promise.all([taskNameCheck, timeScheduledCheck])
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
    .optional()
    .notEmpty()
    .run(req);
    const timeScheduledCheck = body("time_scheduled", "TimeScheduled is required and must be a valid date")
      .isDate()
      .optional()
      .run(req);

  await Promise.all([taskNameCheck, timeScheduledCheck]);
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    return errorResponse(res, errors.array().join(', '), StatusCodes.BAD_REQUEST);
  }
  next();
};
