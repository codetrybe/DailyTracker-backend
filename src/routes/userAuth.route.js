import { forgotpassword, login, register, resendEmailVerification, resetPassword, verifyEmail, verifyPasswordOtp } from "../controllers/userAuth.controller.js";
import { registerValidator } from "../middlewares/validation/register.validation.js";

export default (router) => {
  router.post("/users/signUp", registerValidator, register);
  router.post("/users/verifyEmail", verifyEmail);
  router.post("/users/resendEmailVerification", resendEmailVerification);
  router.post("/users/login", login);
  router.post("/users/forgotPassword", forgotpassword);
  router.post("/users/verifyPasswordOtp", verifyPasswordOtp);
  router.post("/users/resetPassword", resetPassword);

};
