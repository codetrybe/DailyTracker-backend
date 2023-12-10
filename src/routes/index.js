import { Router } from "express";
import registerRoute from "./register.route.js";

const router = Router();

registerRoute(router);

export default router;