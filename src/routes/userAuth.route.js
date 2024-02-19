import { forgotpassword, login, register, resendEmailVerification, resetPassword, verifyEmail, verifyPasswordOtp } from "../controllers/userAuth.controller.js";
import { userAuth } from "../middlewares/authorization/user.auth..js";
import { loginValidator, registerValidator } from "../middlewares/validation/user.validation.js";

export default (router) => {
  router.post("/users/signUp", registerValidator, register);
  router.post("/users/verifyEmail", verifyEmail);
  router.post("/users/resendEmailVerification", resendEmailVerification);
  router.post("/users/login", loginValidator, login);
  router.post("/users/forgotPassword", forgotpassword);
  router.post("/users/verifyPasswordOtp", verifyPasswordOtp);
  router.post("/users/reset", userAuth, resetPassword);

};


// CODE FOR THE TASK ROUTE
// tasksRoutes.js

const express = require('express');
const router = express.Router();
import { createTask } from '../controllers/tasksController';
import userAuth from '../middleware/userAuth';

// POST route to create a new task
router.post('/tasks', userAuth, createTask);

module.exports = router;
