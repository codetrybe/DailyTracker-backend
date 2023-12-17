import { verifyEmail } from "../controllers/verify.controller.js";


export default (router) => {
	router.post('/verify-email', verifyEmail);
}