import {
  createTodoList,
  getAllTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";
import { createTodoValidator } from "../middlewares/validation/user.validation.js";

export default (router) => {
  router.post("/todo",createTodoValidator, userAuth, createTodoList);
  router.get("/todo", userAuth, getAllTodos);
  router.get("/todo/:list_id", userAuth, getTodo);
  router.patch("/todo/:list_id", userAuth, updateTodo);
  router.delete("/todo/:list_id", userAuth, deleteTodo);
  //   there is a missing controller for the deleting all todoLists
};
