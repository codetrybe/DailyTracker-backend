import { Router } from "express";

const router = Router();
const User = require('./user-login.js');

router.post('/login', User.login);

export default router;