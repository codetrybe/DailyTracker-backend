import { changePassword, deleteUser, getUser, updateUser } from "../controllers/user.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";
import { updateValidator } from "../middlewares/validation/user.validation.js";
import { changePasswordValidator } from "../middlewares/validation/user.validation.js";


export default (router) => {
	router.get("/users", userAuth, getUser);
	router.put("/users", userAuth, updateValidator, updateUser);
	router.put("/users/changePassword", userAuth, changePasswordValidator, changePassword);
	router.delete("/users", userAuth, deleteUser);
};
