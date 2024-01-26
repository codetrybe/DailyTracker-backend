import db from '../config/db.js'
import util from "util"
import tryCatch from "../utils/libs/tryCatch.js";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import { StatusCodes } from "http-status-codes";


const queryPromise = util.promisify(db.query).bind(db);

export const delete_todo = tryCatch(async (req, res) => {

  /** 
   * TODO:-
   * get list ID through reqeust parameter
   * Verify if List ID is valid in the task table
   * Delete list /assosciated with that user/ from the task table in the database
   */

  const list_Id = req.params.list_Id
  console.log(list_Id)

  const getListQuery = "SELECT * FROM task WHERE task_id = ?"

  const doesListExist = await queryPromise(getListQuery, [ list_Id ])

  if (doesListExist.length === 0) {
    return errorResponse(res, "NO such list found", StatusCodes.NOT_FOUND);
  }

  const deleteListQuery = "DELETE FROM task WHERE task_id = ?"
  
  await queryPromise(deleteListQuery, [ list_Id ])
  return successResponse(res, `Deleted the task '${doesListExist[0].task_name}' from your Todo's`, {});

})