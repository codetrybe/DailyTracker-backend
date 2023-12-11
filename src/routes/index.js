import { Router } from "express";
import registerRoute from "./register.route.js";
import deleteRoute from "./delete.route.js";

const router = Router();
const User = require('./user-login.js');
registerRoute(router);
deleteRoute(router);
export default router;