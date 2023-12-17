import { body, validationResult } from "express-validator";


export const registerValidator = async(req, res, next)=>{
		// fullname validation
		await body('fullname').trim().isLength({ min: 2 }).withMessage('Fullname is required').run(req);
		// username validation
		body('username').trim().isAlphanumeric().withMessage('Username must be alphanumeric');
		// email validation
		body('email').isEmail().withMessage('Invalid email address');
		// Password validation
		await body('password_hash').isLength({ min: 8 }).withMessage('Password must be at least 6 characters').run(req);
		// phone validation
		body('phone').isMobilePhone().withMessage("invalid phone number");
		// location validation
		body('location').trim().isLength({ min: 1 }).withMessage('Location is required');

		// checking for errors and handling them

		const errors  = validationResult(req);

		if (!errors.isEmpty()){
			return res.status(400).json({"errors": errors.array()})
		}
		next()
}
