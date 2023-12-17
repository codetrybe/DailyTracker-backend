import { verifyEmail } from "../controllers/verify.controller.js";


export default (router) => {
	router.post('/user/verify-email', verifyEmail);
	// route to request a new OTP
}