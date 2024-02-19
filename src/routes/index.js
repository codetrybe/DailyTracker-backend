
import { Router } from "express";
import userAuthRoute from "./userAuth.route.js";
import userRoute from "./user.route.js";
import todoRoute from "./todoRoutes.js"

const router = Router();

userAuthRoute(router);
userRoute(router);
todoRoute (router)
export default router;
