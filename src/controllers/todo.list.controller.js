import { StatusCodes } from 'http-status-codes';
import db from '../config/db.js';
import { errorResponse, successResponse } from '../utils/libs/response.js';
import tryCatch from '../utils/libs/tryCatch.js';
import util from 'util';

// Convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

/**
 * Create a new Todo List
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const createTodoList = tryCatch(async (req, res) => {
  const { list_name } = req.body;
  // assuming that the user is stored in req.app.token as seen in the authcontroller
  // However, I believe it should be the entire user object and not just the user
  const user_id = req.app.token;
  try {
    // Your logic to create a new Todo List in the database
    const result = await queryPromise(
      'INSERT INTO todo_lists (user_id, list_name, created_at, updated_at) VALUES (?, ?, ?, ?)',
      [user_id, list_name, new Date(), new Date()]
    );

    // Assuming the result object has information about the created Todo List
    const createdTodoList = {
      list_id: result.insertId,
      user_id,
      list_name,
      created_at: new Date(),
      updated_at: new Date(),
    };

    return successResponse(
      res,
      'Todo List created successfully',
      { data: createdTodoList },
      StatusCodes.CREATED
    );
  } catch (error) {
    console.error('Error creating Todo List:', error);
    return errorResponse(res, 'Failed to create Todo List', StatusCodes.INTERNAL_SERVER_ERROR);
  }
});
// THE ROUTE SHOULD BE PROTECTED AND IN THE USER AUTH, AFTER THERE IS A VALIDATION of the idFROM THE user.auth

// This is how the route should be
const express = require('express');
const router = express.Router();
import userAuth from '../middleware/userAuth';
import {
  createTodoList,
 } from '../controllers/todoListsController';

// POST route to create a new Todo List
router.post('/todo-lists', userAuth, createTodoList);