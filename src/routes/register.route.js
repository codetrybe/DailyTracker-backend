import { register } from "../controllers/Register.controller.js"
import { registerValidator } from "../middlewares/validation/register.validation.js";

export default (router) => {
	router.post("/user/sign-up", registerValidator, register);
}