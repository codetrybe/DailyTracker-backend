import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

/**
 * Send Email Helper 
 * @param  to - The email address of the recipient
 * @param  subject - The subject of the email
 * @param  message - The message of the email
 * @returns void
 */
export const sendEmail = async (to, subject, message) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
            secure: true,
            auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS
			}
		});
		await transporter.sendMail({
			from: process.env.SMTP_USER,
            to,
            subject,
            html: message
		})
		console.log(`Message sent successfully`);		
	} catch (error) {
		console.log(`Error sending email: ${error.message}`);
	}
};