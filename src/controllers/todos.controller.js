import { successResponse, errorResponse } from "../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";
import db from "../config/db.js";
import tryCatch from "../utils/libs/tryCatch.js";
import util from "util";

// Converting db.query to promise based function
const queryPromise = util.promisify(db.query).bind(db);

/**
 * Create a new Todo List
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const createTodoList = tryCatch(async (req, res) => {
  const { list_name, time_scheduled } = req.body;
  // assuming that the user is stored in req.app.token as seen in the authcontroller
  // However, I believe it should be the entire user object and not just the user
  const { user_id } = req.app.get("user");

    // Your logic to create a new Todo List in the database
     await queryPromise(
      "INSERT INTO todo_lists (user_id, list_name, time_scheduled) VALUES (?, ?, ?)",
      [user_id, list_name, time_scheduled]
    );

    // // Assuming the result object has information about the created Todo List
    // const createdTodoList = {
    //   list_id: result.insertId,
    //   user_id,
    //   list_name
    // };

    return successResponse(
      res,
      "Todo List created successfully",
      StatusCodes.CREATED
    );
});

/**
 * Get all todo lists, given userId
 * @param  req - the request object
 * @param  res - the response object
 * @returns ISuccessResponse | IErrorResponse
 */
export const getAllTodos = tryCatch(async (req, res) => {
  // const userId = req.params.userId;

  const { user_id } = req.app.get("user");

  // Check if user matching provided userId exists
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  const user = await queryPromise(checkUserQuery, [user_id]);

  if (user.length === 0) {
    return errorResponse(res, "Invalid user", StatusCodes.NOT_FOUND);
  }

  // Get all todos for user with matching userId
  // const getTodoQuery =
  //   "SELECT todo_lists.* FROM todo_lists JOIN users ON todo_lists.user_id = users.user_id WHERE users.user_id = ?";
  const getTodoQuery = "SELECT * FROM todo_lists WHERE user_id = ?";
  const todoList = await queryPromise(getTodoQuery, [user_id]);

  // if (todoList.length > 0) {
    return successResponse(res, "Request successful", todoList);
  // }

  // return errorResponse(res, "List empty", StatusCodes.NOT_FOUND);
});

/**
 * Fetch a todo list, given userId and listID
 * @param  req - the request object
 * @param  res - the response object
 * @returns ISuccessResponse | IErrorResponse
 */
export const getTodo = tryCatch(async (req, res) => {
  // const userId = req.params.userId;
  const userId = req.app.get("user").user_id;
  const listId = req.params.list_id;

  // Check if user matching provided userId exists
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  const user = await queryPromise(checkUserQuery, [userId]);

  if (user.length === 0) {
    return errorResponse(res, "Invalid user", StatusCodes.NOT_FOUND);
  }

  // Find todo list matching userId and listID.
  const getTodoQuery =
    "SELECT * FROM todo_lists  WHERE user_id = ? AND list_id = ?";

  const queriedTodo = await queryPromise(getTodoQuery, [userId, listId]);
  if (queriedTodo.length === 0) {
    return errorResponse(
      res,
      "Todo with given list ID not found",
      StatusCodes.NOT_FOUND
    );
  }

  return successResponse(res, "Request successful", queriedTodo);
});

/**
 * Update a todo list, given userId and listID
 * @param  req - the request object
 * @param  res - the response object
 * @returns ISuccessResponse | IErrorResponse
 */
export const updateTodo = tryCatch(async (req, res) => {
  const restrictedFields = ["list_id", "user_id", "created_at", "updated_at"];

  // const userId = req.params.userId;
  const userId = req.app.get("user").user_id;
  const listId = req.params.list_id;
  const requestBody = req.body;

  // Check if user matching provided userId exists
  const checkUserQuery = "SELECT * FROM users WHERE user_id = ?";
  const user = await queryPromise(checkUserQuery, [userId]);

  if (user.length === 0) {
    return errorResponse(res, "User Not Found!", StatusCodes.NOT_FOUND);
  }

  // Find todo list matching userId and listID. Return error if not found.
  const getTodoQuery =
    "SELECT * FROM todo_lists WHERE user_id = ? AND list_id = ?";

  const todoStatus = await queryPromise(getTodoQuery, [userId, listId]);
  if (todoStatus.length === 0) {
    return errorResponse(
      res,
      "Todo with given list ID not found for user",
      StatusCodes.NOT_FOUND
    );
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
    listId,
  ]);

  return successResponse(res, "List updated successfully");
});

/**
 * TODO:
 * - Filter information to be fetched on get todo routes
 */


/**
 * Delete a todo list, given userId and listID
 * @param  req - the request object
 * @param  res - the response object
 * @returns ISuccessResponse | IErrorResponse
 */
export const deleteTodo = tryCatch(async (req, res) => {
  /**
   * TODO:-
   * get list ID through request parameter
   * Verify if List ID is valid in the task table
   * Delete list /associated with that user/ from the task table in the database
   */

  const list_Id = req.params.list_Id;
  console.log(list_Id);

  const getListQuery = "SELECT * FROM task WHERE task_id = ?";

  const doesListExist = await queryPromise(getListQuery, [list_Id]);

  if (doesListExist.length === 0) {
    return errorResponse(res, "NO such list found", StatusCodes.NOT_FOUND);
  }

  const deleteListQuery = "DELETE FROM task WHERE task_id = ?";

  await queryPromise(deleteListQuery, [list_Id]);
  return successResponse(
    res,
    `Deleted the task '${doesListExist[0].task_name}' from your Todo's`,
    {}
  );
});
