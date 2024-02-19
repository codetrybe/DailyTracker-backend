
import { Router } from "express";
import userAuthRoute from "./userAuth.route.js";
import userRoute from "./user.route.js";
import todoRoute from "./todos.route.js";
import taskRoute from "./tasks.route.js";

const router = Router();

userAuthRoute(router);
userRoute(router);
todoRoute (router)
taskRoute(router)
export default router;
