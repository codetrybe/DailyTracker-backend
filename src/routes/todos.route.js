import { deleteTodo } from "../controllers/todos.controller"

export default (router) => {
  /**
   * TODO: - Add all other routes for todos
   */
  router.delete('/todo/:list_Id', deleteTodo)
}