import { update } from "../controllers/edit.controller.js";

export default (router) => {
	router.patch('/edit/:userId', update);
}