import connection from '../config/db.js';
import { verifyToken } from '../utils/helpers/jwt.helper.js'; //To verify using OTP


/**
 * verify user's email using the verification OTP
 * @param {*} req - Express Request Object
 * @param {*} res - Express Response Object
 * @returns 
 */
const verifyEmail = async (req, res) => {
    try {
        const { token } = req.query;

        // check if token is provided
        if (!token) {
            return res.status(400).json({
                status: 'error',
                error: 'Token not provided'
            });
        }

        // Verify the token
        let decodedToken;
        try {
            decodedToken = verifyToken(token);
        }
        catch (error) {
            return res.status(400).json({
                status: 'error',
                error: 'Invalid token'
            });
        }

        // Extract the email from the decoded token
        const { email } = decodedToken;

        // database connection
        const updateQuery = `UPDATE users SET isVerified = true WHERE email = ?`;
        await connection.promise().query(updateQuery, ['verified', email]);

        // Respond with a success message
        res.status(200).json({ message: 'Email verified successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};

export default verifyEmail;
