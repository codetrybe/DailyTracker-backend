import { successResponse, errorResponse } from "../utils/libs/response.js"
import trycatch from "../utils/libs/tryCatch.js"
import { deleteFromTable, insertIntoTable, selectFromTable, updateTable } from "../config/sql.js"
import { StatusCodes } from "http-status-codes"

const tableName = 'reviews' 
/***
 *  TO DO
 * 
 * create post_review function
 * create edit_review function
 * create delete_review function
 */

export const post_review = trycatch(async(req, res) =>{
  const { user_id, rating, comment } = req.body

  if (!user_id || !rating || !comment){
    let missing_field = !user_id ? "user_id" : !rating ? 'rating' : 'comment'
    return errorResponse(res, `${missing_field} field is required`, StatusCodes.BAD_REQUEST)
  }

  const insertReviewResult = await insertIntoTable(tableName, ['user_id', 'rating', 'comment'], [user_id, rating, comment])
  console.log(insertReviewResult)
  return successResponse(res, 'user review', { user_id, rating, comment },StatusCodes.CREATED)
})

export const edit_review = trycatch(async(req, res) => {
  const { user_id, review_id, updated_comment, rating } = req.body

  if (!user_id || !review_id || !updated_comment ){
    let missing_field = !user_id ? "user_id" : !review_id ? 'review_id' : 'updated_comment'
    return errorResponse(res, `${missing_field} field is required`, StatusCodes.BAD_REQUEST)
  }

  const selectResult = await selectFromTable(tableName, '*', `reviews_id = ${review_id} AND user_id = '${user_id}'`)

  if (selectResult.length === 0){
    return errorResponse(res, 'The review you seek does not exist', StatusCodes.EXPECTATION_FAILED)
  }

  const fieldToUpdate = [
    { field: 'comment', value: updated_comment },
    { field: 'rating', value: rating }
  ] 

  const conditions = [
    ['reviews_id', review_id],
    ['user_id', user_id]
  ]
  const result = await updateTable(tableName, fieldToUpdate, conditions)

  console.log(result)
  return successResponse(res, 'update review', {user_id, review_id, updated_comment})
})

export const delete_review = trycatch(async(req, res) => {
  const { user_id, review_id, rating } = req.body

  if (!user_id || !review_id || !rating ){
    let missing_field = !user_id ? "user_id" : !review_id ? 'review_id' : "rating"
    return errorResponse(res, `${missing_field} field is required`, StatusCodes.BAD_REQUEST)
  }

  const validReview = await selectFromTable(tableName, '*',  `user_id = '${user_id}'
   AND rating = ${rating} AND reviews_id = ${review_id}`)

   if (validReview.length === 0){
    return errorResponse(res, 'Not a valid review', StatusCodes.BAD_REQUEST)
   }

  const conditions = [
    `user_id = '${user_id}'`,
    `rating = ${rating}`,
    `reviews_id = ${review_id}`
  ];
  const result = await deleteFromTable(tableName, conditions)
  return successResponse(res, 'delete review', { user_id, review_id, result })
}) 
