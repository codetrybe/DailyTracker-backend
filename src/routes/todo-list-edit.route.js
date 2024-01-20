import { updateTodo } from "../controllers/todo-list-edit.controller";

export default (router) => {
  router.patch('user/:userId/todo/:listId', updateTodo);
}