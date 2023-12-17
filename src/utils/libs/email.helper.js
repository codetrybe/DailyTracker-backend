import { nodemailer } from 'nodemailer';


const sendVerificationEmail = async (email, verificationToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_EMAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMTP_EMAIL,
            to: email,
            subject: 'Verify your email',
            html: `<p>Please click <a href="http://localhost:3000/verify-email?token=${verificationToken}">here</a> to verify your email</p>`
        };

        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log(error);
    }
};

export default sendVerificationEmail;