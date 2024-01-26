import { successResponse, errorResponse } from "../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";
import db from "../config/db.js";
import tryCatch from "../utils/libs/tryCatch.js";
import util from "util";


// Converting db.query to promise based function
const queryPromise = util.promisify(db.query).bind(db);


// fetch all todo lists linked to a user
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


// fetch a single todo list
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


//Update details of a todo list, given userId and listID
export const updateTodo = tryCatch(async (req, res) => {
  const restrictedFields = [
    "list_id",
    "user_id",
    "created_at",
    "updated_at",
  ];

  const userId = req.params.userId;
  const listId = req.params.listId;
  const requestBody = req.body;

  // Check if user matching provided userId exists
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  const user = await queryPromise(checkUserQuery, [userId]);

  if (user.length === 0) {
    return errorResponse(res, "User Not Found!", StatusCodes.NOT_FOUND);
  }

  // Find todo list matching userId and listID. Return error if not found.
  const getTodoQuery = "SELECT todo_lists.* FROM todo_lists JOIN users ON todo_lists.user_id = users.user_id WHERE users.user_id = ? AND todo_lists.list_id = ?";
  
  const todoStatus = await queryPromise(getTodoQuery, [userId, listId]);
  if (todoStatus.length === 0) {
    return errorResponse(res, "Todo with given list ID not found for user", StatusCodes.NOT_FOUND);
  }
  
  // remove restricted fields from details provided by user
  const updatedTodoData = (restrictedFields, requestBody) => {
    if (requestBody) {
      restrictedFields.forEach((field) => {
        delete requestBody[field];
      });
    }
    return requestBody;
  };

  // Update todo list with the specified listId using the filtered user-provided details
  const todoUpdateQuery = "UPDATE todo_lists SET ? WHERE list_id = ?";

  await queryPromise(todoUpdateQuery, [
    updatedTodoData(restrictedFields, requestBody),
    listId
  ]);

  return successResponse(res, "List updated sucessfully, {}");
});

/**
 * TODO:
 * - Filter information to be fetched on get todo routes
 */