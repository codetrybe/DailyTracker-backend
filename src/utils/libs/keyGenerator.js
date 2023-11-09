import { randomBytes } from "crypto";

/**
￼ * This function is used to generated random token of a specific length
￼ * @param len - Token size to be generated
￼ * @return token - The generated token
￼*/
export const tokenGenerator = (len) => randomBytes(len).toString("hex");

/**
￼ * This function is used to generated random otp code of a specified length
￼ * @param len - Token size to be generated default is 4
￼ * @return code - The generated otp code
￼ */
export const otpGenerator = (len = 4) =>
	Math.ceil(Math.random() * 10 ** len).padEnd(len, "0");
