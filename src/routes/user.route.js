import { changePassword, deleteUser, getUser, updateUser } from "../controllers/user.controller";

export default (router) => {
	router.get("/users/:user_id", getUser);
	router.put("/users/:user_id", updateUser);
	router.put("/users/:user_id/change_password", changePassword);
	router.delete("/users/:user_id", deleteUser);
};
