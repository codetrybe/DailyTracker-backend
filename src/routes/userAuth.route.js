import {
  forgotpassword,
  login,
  register,
  resendEmailVerification,
  resetPassword,
  verifyEmail,
  verifyPasswordOtp,
} from "../controllers/userAuth.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";
import {
  loginValidator,
  registerValidator,
  verifyEmailValidator,
} from "../middlewares/validation/user.validation.js";
import upload from "../middlewares/fileupload/multer.js";

export default (router) => {
  router.post(
    "/users/signUp",
    upload.single("image"),
    registerValidator,
    register
  );
  router.post("/users/verifyEmail", verifyEmailValidator, verifyEmail);
  router.post("/users/resendEmailVerification", resendEmailVerification);
  router.post("/users/login", loginValidator, login);
  router.post("/users/forgotPassword", forgotpassword);
  router.post("/users/verifyPasswordOtp", verifyPasswordOtp);
  router.post("/users/reset", userAuth, resetPassword);
};
