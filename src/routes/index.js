import { Router } from "express";
import registerRoute from "./register.route.js";
import deleteRoute from "./delete.route.js";

const router = Router();

registerRoute(router);
deleteRoute(router);
export default router;