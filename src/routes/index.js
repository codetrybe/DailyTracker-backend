
import { Router } from "express";
import registerRoute from "./register.route.js";
import deleteRoute from "./delete.route.js";
import loginRoute from "./login.route.js";
import verifyRoute from "./verify.route.js";

const router = Router();

registerRoute(router);
loginRoute(router);
deleteRoute(router);
verifyRoute(router);

export default router;
