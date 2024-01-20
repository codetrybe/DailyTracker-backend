import { changePassword, deleteUser, getUser, updateUser } from "../controllers/user.controller.js";

export default (router) => {
	router.get("/users/:user_id", getUser);
	router.put("/users/:user_id", updateUser);
	router.put("/users/:user_id/changePassword", changePassword);
	router.delete("/users/:user_id", deleteUser);
};
