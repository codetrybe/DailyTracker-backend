import { forgotpassword, login, register, resendEmailVerification, resetPassword, verifyEmail, verifyPasswordOtp } from "../controllers/userAuth.controller.js";
import { registerValidator } from "../middlewares/validation/register.validation.js";

export default (router) => {
  router.post("/users/signUp", registerValidator, register);
  router.post("/users/verifyEmail", verifyEmail);
  router.post("/users/resendEmailVerification", resendEmailVerification);
  router.post("/users/login", login);
  router.post("/users/forgotPassword", forgotpassword);
  router.post("/users/verifyPasswordOtp", verifyPasswordOtp);
  router.post("/users/:user_id/resetPassword", resetPassword);

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
