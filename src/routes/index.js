
import { Router } from "express";
import registerRoute from "./register.route.js";
import deleteRoute from "./delete.route.js";
import loginRoute from "./login.route.js";

const router = express.Router();

// POST /verify-email
router.post('/verify-email', verifyEmail);
registerRoute(router);
loginRoute(router);
deleteRoute(router);

export default router;
