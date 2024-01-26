
import { Router } from "express";
import userAuthRoute from "./userAuth.route.js";
import userRoute from "./user.route.js";

const router = Router();

userAuthRoute(router);
userRoute(router);

export default router;
