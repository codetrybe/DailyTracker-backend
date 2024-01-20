export const removePasswordFromUser = (user) => {
	const { password_hash, ...rest } = user;
	return rest;
}