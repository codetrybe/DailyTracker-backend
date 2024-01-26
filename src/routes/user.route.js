import { changePassword, deleteUser, getUser, updateUser } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";

export default (router) => {
	router.get("/users/:user_id", userAuth, getUser);
	router.put("/users/:user_id", userAuth, updateUser);
	router.put("/users/:user_id/changePassword", userAuth, changePassword);
	router.delete("/users/:user_id", userAuth, deleteUser);
};
