/**
 * Remove password from user object
 * @param  user
 * @returns user object
 */
export const removePasswordFromUser = (user) => {
	const { password_hash, ...rest } = user;
	return rest;
}