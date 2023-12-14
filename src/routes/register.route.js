import { register } from "../controllers/Register.controller.js"

export default (router) => {
	router.post("/user/sign-up", register);
}