import { delete_todo } from "../controllers/todo-list-deletion.controller.js"

export default (router) => {
  router.delete('/todo/:list_Id', delete_todo)
}