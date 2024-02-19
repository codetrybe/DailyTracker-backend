import { changePassword, deleteUser, getUser, updateUser } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";

export default (router) => {
	router.get("/users", userAuth, getUser);
	router.put("/users", userAuth, updateUser);
	router.put("/users/changePassword", userAuth, changePassword);
	router.delete("/users", userAuth, deleteUser);
};
