import otpverify  from '../controllers/otpverify.controller.js'

export default (router) => {
	router.route("/verifyotp").get(otpverify.getOtp).post(otpverify.verifyOtp);
}