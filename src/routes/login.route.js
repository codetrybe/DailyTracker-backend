import { login } from "../controllers/Login.controller.js";

export default (router) => {
	router.post("/user/login", login);
}