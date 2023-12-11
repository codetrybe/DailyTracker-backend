import { deleteUser } from "../controllers/delete.controller.js";


export default (router) => {
	router.delete("/users/:user_id", deleteUser);
}