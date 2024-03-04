
import { Router } from "express";
import userAuthRoute from "./userAuth.route.js";
import userRoute from "./user.route.js";
import todoRoute from "./todos.route.js";
import taskRoute from "./tasks.route.js";
import reviewRoute from "./review.route.js";
import fileUploadRoute from "./fileUpload.route.js";

const router = Router();

userAuthRoute(router);
userRoute(router);
todoRoute (router)
taskRoute(router)
reviewRoute(router)
fileUploadRoute(router)
export default router;
