import { StatusCodes } from "http-status-codes";
import {errorResponse, successResponse } from "../utils/libs/response.js";
import tryCatch from "../utils/libs/tryCatch.js";
import db from "../config/db.js";
import util from "util";


// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

/**
 * Create a TodoList 
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */

export const createTodoList = tryCatch(async (req, res) => {
    // get list name from the body of the request
	const {list_name, time_scheduled} = req.body;

    // get the user_id from the req.app object

    const {user} = req.app.user
    const user_id = user.id;

const todoList = {
    user_id,
    list_name,
    time_scheduled,
  };

await queryPromise('INSERT INTO todo_lists SET ?', todoList);

return successResponse(res, "todoList created successfully", todoList,  StatusCodes.CREATED)	
})
// get all todolists belonging to a user
export const getTodoLists = tryCatch(async (req, res) => {
    // get user_id from the req.params
    const user_id = req.params.user-id;
    // find the tasks associated with the said user in the db

    const todoLists = await queryPromise('SELECT * FROM todo_lists WHERE user_id = ?', userId);
     if (todoLists.length === 0) {
      return errorResponse(res, "No todoLists found for this user", 404)
    }
    return successResponse(res, "got todolists successfully", {todoLists}, 200)
})

// get single todolist
export const getSingleTodoList = tryCatch(async (req, res) => {
    // get user_id from the req.params
    const list_id = req.params.list-id;

    // get the user_id assuming it is not passed in the params
    const {user} = req.app.user
    const user_id = user.id;

    // find the todolist associated with the said list_id in the db

    const todoList = await queryPromise('SELECT * FROM todo_lists WHERE list_id = ? AND user_id = ?', [list_id, user_id]);
     if (todoList.length === 0) {
      return errorResponse(res, `No todoList found for with id of ${list_id}`, 404)
    }
    return successResponse(res, "got todolist successfully", {todoList}, 200)
})


export const updateTodoList = tryCatch(async (req, res) => {
    // get user_id from the req.params
    const list_id = req.params.list-id;

    // get the user_id assuming it is not passed in the params
    const {user} = req.app.user
    const user_id = user.id;

    // get the new information from the request.body

    const { list_name, time_scheduled } = req.body;

    // find the todolist associated with the said list_id in the db

    const todoList = await queryPromise('SELECT * FROM todo_lists WHERE list_id = ? AND user_id = ?', [list_id, user_id]);
     if (todoList.length === 0) {
      return errorResponse(res, `not found`, 404)
    }

     // Update the todo list
    const updateSql = 'UPDATE todo_lists SET list_name = ?, time_scheduled = ? WHERE list_id = ?';
    await queryPromise(updateSql, [list_name, time_scheduled, list_id]);

    // Retrieve the updated todo list
    const updatedTodoList = await queryPromise(checkSql, [listId, userId]);


    return successResponse(res, "got todolist successfully", {updatedTodoList}, 201)
})

export const deleteTodoList = tryCatch(async (req, res) => {
    // get user_id from the req.params
    const list_id = req.params.list-id;

    // get the user_id assuming it is not passed in the params
    const {user} = req.app.user
    const user_id = user.id;


    // find the todolist associated with the said list_id in the db

    const todoList = await queryPromise('SELECT * FROM todo_lists WHERE list_id = ? AND user_id = ?', [list_id, user_id]);
     if (todoList.length === 0) {
      return errorResponse(res, `not found`, 404)
    }

     // delete the todo list
    const deleteQuery = 'DELETE FROM todo_lists WHERE list_id = ?';
    await queryPromise(deleteQuery, list_id);

    return successResponse(res, "deleted todolist successfully", {}, 200);
})


export const deleteAllLists = tryCatch(async (req, res) => {
   
    // get the user_id assuming it is not passed in the params
    const {user} = req.app.user
    const user_id = user.id;

    // find the todolist associated with the said list_id in the db

    const todoList = await queryPromise('SELECT * FROM todo_lists WHERE  user_id = ?',  user_id);
     if (todoList.length === 0) {
      return errorResponse(res, `not found found`, 404)
    }

     // delete the todo list
    const deleteSql = 'DELETE FROM todo_lists  WHERE user_id = ?';
    await queryPromise(deleteSql, user_id);



        return successResponse(res, "All todolists have been deleted successfully", {}, 200);

})