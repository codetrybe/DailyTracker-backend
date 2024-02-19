import db from "../config/db.js";
import util from "util";
import tryCatch from "../utils/libs/tryCatch.js";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";
import { insertIntoTable } from "../config/sql.js";

const queryPromise = util.promisify(db.query).bind(db);

// Create a new task
export const add_task = tryCatch(async (req, res) => {
  const listId = req.params.list_id;
  const { task_name, time_scheduled } = req.body;

//   const insertTaskQuery = `INSERT INTO tasks (list_id, task_name, time_scheduled) VALUES (?, ?, ?)`;
//   const insertTaskValues = [listId, task_name, time_scheduled];

//   const insertTaskResult = await queryPromise(
//     insertTaskQuery,
//     insertTaskValues
//   );
//   const insertTaskId = insertTaskResult.insertId;

const insertTaskResult = await insertIntoTable(
  "tasks",
  ['list_id', 'task_name', 'time_scheduled'],
  [ listId, task_name, time_scheduled]
);
const insertTaskId = insertTaskResult.insertId

  return successResponse(
    res,
    "Task created successfully",
    { task_id: insertTaskId },
    StatusCodes.CREATED
  );
});

// Edit an existing task
export const edit_task = tryCatch(async (req, res) => {
  /**
   * TODO:
   * Get the task ID from the request parameters
   * Get the task name from the request body
   * Validate the task name
   * Update the task name in the database
   * Return a success response
   */
  const { task_id } = req.params;
  const { task_name } = req.body;

  const updateTaskQuery = `UPDATE tasks SET task_name = ? WHERE task_id = ?`;
  const updateTaskValues = [task_name, task_id];

  await queryPromise(updateTaskQuery, updateTaskValues);

  return successResponse(res, "Task updated successfully");
});

// Delete an existing task
export const delete_task = tryCatch(async (req, res) => {
  /**
   * TODO:
   * Get the task ID from the request parameters
   * Delete the task from the database
   * Return a success response
   */
  const { task_id } = req.params;

  const deleteTaskQuery = `DELETE FROM tasks WHERE task_id = ?`;
  const deleteTaskValues = [task_id];

  await queryPromise(deleteTaskQuery, deleteTaskValues);

  return successResponse(res, "Task deleted successfully");
});

/**
 * TODOS: Mr Whyte
 * - add endpoint to get all tasks
 * - add endpoint to get a single task
 */

export const get_all_tasks = tryCatch(async (req, res) => {
  const getTasksQuery = `SELECT * FROM tasks`;
  const tasks = await queryPromise(getTasksQuery);

  return successResponse(res, "Tasks retrieved successfully", tasks);
});

export const get_single_task = tryCatch(async (req, res) => {
  const { task_id } = req.params;

  const getTaskQuery = `SELECT * FROM tasks WHERE task_id = ?`;
  const getTaskValues = [task_id];

  const task = await queryPromise(getTaskQuery, getTaskValues);

  return successResponse(res, "Task retrieved successfully", task[0]);
});
