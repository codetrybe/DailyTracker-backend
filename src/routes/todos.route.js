import {
  createTodoList,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";
import { createTodoValidator } from "../middlewares/validation/todo.validation.js";
import { updateTodoValidator } from "../middlewares/validation/todo.validation.js";

export default (router) => {
  router.post("/todo", userAuth, createTodoValidator, createTodoList);
  router.get("/todo", userAuth, getAllTodos);
  router.get("/todo/:list_id", userAuth, getTodo);
  router.patch("/todo/:list_id", userAuth, updateTodoValidator, updateTodo);
  router.delete("/todo/:list_id", userAuth, deleteTodo);
  //   there is a missing controller for the deleting all todoLists
};
