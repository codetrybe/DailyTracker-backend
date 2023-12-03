import express from 'express';
import verifyEmail from '../controllers/user.controller.js';

const router = express.Router();

// POST /verify-email
router.post('/verify-email', verifyEmail);

export default router;
