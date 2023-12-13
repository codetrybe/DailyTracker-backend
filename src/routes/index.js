import { Router } from "express";
import registerRoute from "./register.route.js";
import deleteRoute from "./delete.route.js";
import loginRoute from "./login.route.js";
import forgotpassword from "./forgotpassword.route.js"
import resetpassword from "./resetpassword.route.js"

const router = Router();

registerRoute(router);
loginRoute(router);
deleteRoute(router);
forgotpassword(router);
resetpassword(router);

export default router;