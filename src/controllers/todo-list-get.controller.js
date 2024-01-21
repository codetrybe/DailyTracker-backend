import { successResponse, errorResponse } from "../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";
import db from "../config/db.js";
import tryCatch from "../utils/libs/tryCatch.js";
import util from "util";

const queryPromise = util.promisify(db.query).bind(db);

export const getAllTodos = tryCatch(async (req, res) => {
  const userId = req.params.userId;

   // Check if user matching provided userId exists
   const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
   const user = await queryPromise(checkUserQuery, [userId]);
 
   if (user.length === 0) {
     return errorResponse(res, "Invalid user", StatusCodes.NOT_FOUND);
   }

  // Get all todos for user with matching userId
  const getTodoQuery = "SELECT todo_lists.* FROM todo_lists JOIN users ON todo_lists.user_id = users.user_id WHERE users.user_id = ?";
  const todoList = await queryPromise(getTodoQuery, [userId]);

  if (todoList.length > 0) {
    return successResponse(res, "Request successful", todoList);
  }

  return errorResponse(res, "List empty", StatusCodes.NOT_FOUND);
});


export const getTodo = tryCatch(async (req, res) => {
  const userId = req.params.userId;
  const listId = req.params.listId;

  // Check if user matching provided userId exists
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  const user = await queryPromise(checkUserQuery, [userId]);

  if (user.length === 0) {
    return errorResponse(res, "Invalid user", StatusCodes.NOT_FOUND);
  }

  // Find todo list matching userId and listID.
  const getTodoQuery = "SELECT todo_lists.* FROM todo_lists JOIN users ON todo_lists.user_id = users.user_id WHERE users.user_id = ? AND todo_lists.list_id = ?";
  
  const queriedTodo = await queryPromise(getTodoQuery, [userId, listId]);
  if (queriedTodo.length === 0) {
    return errorResponse(res, "Todo with given list ID not found", StatusCodes.NOT_FOUND);
  }

  return successResponse(res, "Request successful", queriedTodo);
});

/**
 * TODO:
 * - Filter info to return
 */