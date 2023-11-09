import bcrypt from 'bcrypt';

/**
 * Bcrypt helper to hash password
 * @param password password to be hashed
 * @returns the hashed password
 */
export const hashPassword = async(password) => {
	let salt = await bcrypt.genSalt()
	let hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
}

/**
 * Bcrypt helper to compare hashed password
 * @param password password to be compared
 * @param hashedPassword hashed password
 * @returns boolean indicating whether password is equal to hashed password or not
 */
export const comparePassword = async(password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword)
}