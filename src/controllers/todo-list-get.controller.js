import { successResponse, errorResponse } from "../utils/libs/response";
import { StatusCodes } from "http-status-codes";
import db from "../config/db";
import tryCatch from "../utils/libs/tryCatch";
import util from "util";

const queryPromise = util.promisify(db.query).bind(db);

export const getAllTodos = tryCatch(async (req, res) => {
  const userId = req.params.userId;

  // Get all todos for user with matching userId
  const getTodoQuery = "SELECT todo_lists.* FROM todo_lists JOIN users ON todo_lists.user_id = users.user_id WHERE users.user_id = ?";
  const todoList = await queryPromise(getTodoQuery, [userId]);

  if (todoList.length > 0) {
    return todoList;
  }

  return errorResponse(res, "List empty", StatusCodes.NOT_FOUND);
});


export const getTodo = tryCatch(async (req, res) => {
  const userId = req.params.userId;
  const listId = req.params.listId;
});

/**
 * TODO:
 * - Filter info to return
 */