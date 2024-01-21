import { getAllTodos, getTodo } from "../controllers/todo-list-get.controller.js";

export const getAllTodosRoute = (router) => {
  router.get('/todo/:userId', getAllTodos);
}

export const getSingleTodoRoute = (router) => {
  router.get('/user/:userId/todo/:listId', getTodo);
}
