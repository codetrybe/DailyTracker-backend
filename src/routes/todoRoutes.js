import { createTodoList, getAllTodos, getTodo, updateTodo, deleteTodo } from "../controllers/todos.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";

export default (router) => {
  router.post("/todo", userAuth, createTodoList);
  router.get("/todo/:user-id", userAuth, getAllTodos);
  router.get("/todo/:list-id", userAuth, getTodo);
  router.patch("/todo/:list-id",userAuth, updateTodo);
  router.delete("/todo/:list-id", userAuth, deleteTodo)
//   there is a missing controller for the deleting all todoLists
};