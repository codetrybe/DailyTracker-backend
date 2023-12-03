import { generateToken } from './jwt.helper';
import sendVerificationEmail from './email.helper';


const generateVerificationToken = async (email) => {
    try {
        // generate a verification token
        const verificationToken = generateToken({ email }, { expiresIn: '1d' });

        // send verification email
        await sendVerificationEmail(email, verificationToken);

        return verificationToken;
    }
    catch (error) {
        console.log(error);
    }
};

export default generateVerificationToken;
