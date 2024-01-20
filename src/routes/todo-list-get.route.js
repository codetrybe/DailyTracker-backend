import { getAllTodos } from "../controllers/todo-list-get.controller";
import { getTodo } from "../controllers/todo-list-get.controller";

export const getAllTodosRoute = (router) => {
  router.get('/todo/:userId', getAllTodos);
}

export const getSingleTodoRoute = (router) => {
  router.get('/user/:userId/todo/:listId');
}