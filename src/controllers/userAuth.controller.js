import { StatusCodes } from "http-status-codes";
import db from "../config/db.js";
import { errorResponse, successResponse } from "../utils/libs/response.js";
import tryCatch from "../utils/libs/tryCatch.js";
import { comparePassword, hashPassword } from "../utils/helpers/bcrypt.helper.js";
import { v4 as uuid } from "uuid";
import util from "util";
import speakeasy from "speakeasy";
import { sendEmail } from "../services/email.service.js";
import { generateToken } from "../utils/helpers/jwt.helper.js";
import { removePasswordFromUser } from "../utils/helpers/user.helper.js";
// convert the callback-based db.query to a promise-based function
const queryPromise = util.promisify(db.query).bind(db);

/**
 * Register a new user
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const register = tryCatch(async (req, res) => {
  const {
    fullname,
    username,
    email,
    password_hash,
    phone,
    phone2,
    location,
    profile_pic,
  } = req.body;

  // Check if the email already exists in the database
  const existingUser = await queryPromise(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  if (existingUser.length > 0) {
    return errorResponse(
      res,
      "User already exists in the database",
      StatusCodes.CONFLICT
    );
  }
  const hashed = await hashPassword(password_hash);
  const user = {
    user_id: uuid(),
    fullname,
    username,
    email,
    password_hash: hashed,
    phone,
    phone2,
    location,
    profile_pic,
  };

  const newUser = await queryPromise(
    "INSERT INTO users(user_id, fullname, username, email, password_hash, phone, phone2, location, profile_pic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      user.user_id,
      user.fullname,
      user.username,
      user.email,
      user.password_hash,
      user.phone,
      user.phone2,
      user.location,
      user.profile_pic,
    ]
  );
  // Generate OTP TO SEND TO THE USER
  const otp = speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    encoding: "base32",
  });

  // Set OTP expiration (e.g., 5 minutes from now)
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 60);


  // Save OTP and expiration in the database
  await queryPromise(
    "INSERT INTO otp(user_id, otp, expired_at) VALUES (?, ?, ?)",
    [user.user_id, otp, expiration]
  );

  // now we can send OTP to users email
  await sendEmail(
    email,
    "OTP for Registration",
    `<h1>Your OTP for registration is: ${otp}</h1>. <br>It will expire in 5 minutes.`
  );

  const payload = {
    user: {
      id: user.user_id,
    },
  };

  // use jwt to send a payload containing the user_id of the just registered user
  const token = generateToken(payload, "24h");
  console.log("Generated Token:", token);

  return successResponse(
    res,
    "User registered successfully, please verify your email",
    { data: { token } },
    StatusCodes.CREATED
  );
});

/**
 * Verify email 
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const verifyEmail = tryCatch(async (req, res) => {
  const { otp } = req.body;

  const findOtp = await queryPromise("SELECT * FROM otp WHERE otp = ?", [otp]);
  console.log(findOtp)
  if (findOtp.length == 0) {
    return errorResponse(res, "Invalid OTP", StatusCodes.BAD_REQUEST);
  }

  // check if otp is active
  if (findOtp[0].status == "active") {
    return errorResponse(res, "Your account is already verified, please login", StatusCodes.BAD_REQUEST);
  }

  // check if otp has expired
  if (findOtp[0].expired_at < new Date()) {
    return errorResponse(
      res,
      "OTP has expired, please request a new one",
      StatusCodes.BAD_REQUEST
    );
  }
  // update the otp status to active
  await queryPromise("UPDATE otp SET status = 'active' WHERE otp = ?", [otp]);
  // update the user is_email_verified to true
  await queryPromise(
    "UPDATE users SET is_email_verified = true WHERE user_id = ?",
    [findOtp[0].user_id]
  );

  const token = generateToken({ user_id: findOtp[0].user_id }, "24h");

  return successResponse(res, "Email verified successfully",  {data: {user: findOtp[0].user_id}, token}, );
});

/**
 * Resend Email Verification 
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const resendEmailVerification = tryCatch(async (req, res) => {
  const { email } = req.body;

  const user = await queryPromise("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  if (user.length == 0) { 
    return errorResponse(
      res,
      "No user found for this email",
      StatusCodes.BAD_REQUEST
    );
  }

  const otp = speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    encoding: "base32",
  });

  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 5);

  await queryPromise(
    "INSERT INTO otp(user_id, otp, expired_at) VALUES (?, ?, ?)",
    [user[0].user_id, otp, expiration]
  );

  // Send the new OTP to the user's email
  await sendEmail(
    email,
    "New OTP for Email Verification",
    `<h1>Your new OTP for email verification is: ${otp}</h1>. <br>It will expire in 5 minutes.`
  );

  return successResponse(res, "Email verification resent successfully", {});
});

/**
 * Login user
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const login = tryCatch(async (req, res) => {
  /**
   * TODO:
   * - you are required to login with email and password or username and password  and not both
   * - the validation will be implemented in a middleware
   */
  const { email, username, password_hash } = req.body;

  //Takes care of instances where users use email or username
  const emailOrUsername = email || username;

  // Find the user with the given email in the database
  const selectUserQuery = "SELECT * FROM users WHERE email = ? OR username = ?";
  const user = await queryPromise(selectUserQuery, [
    emailOrUsername,
    emailOrUsername,
  ]);
  if (user.length === 0) {
    return errorResponse(
      res,
      "Invalid email or password",
      StatusCodes.UNAUTHORIZED
    );
  }
  const passwordMatch = await comparePassword(password_hash, user[0].password_hash);

  if (!passwordMatch) {
    return errorResponse(
      res,
      "Invalid email or password",
      StatusCodes.UNAUTHORIZED
    );
  }

  const token = generateToken(
    { userId: user[0].user_id, email: user[0].email },
    "1h"
  );

  return successResponse(res, "Login successful", {data:{user: removePasswordFromUser(user[0])}, token});
});

/**
 * Forgot password 
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const forgotpassword = tryCatch(async (req, res) => {
  const { email } = req.body;
  const user = await queryPromise(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  if (!user[0]) {
    return errorResponse(
      res,
      "No user found for this email",
      StatusCodes.BAD_REQUEST
    );
  }
  console.log(user);
  // Generate OTP TO SEND TO THE USER
  const otp = speakeasy.totp({
    secret: speakeasy.generateSecret().base32,
    encoding: "base32",
  });


  // Set OTP expiration (e.g., 5 minutes from now)
  const expiration = new Date();
  expiration.setMinutes(expiration.getMinutes() + 60);

  // Save OTP and expiration in the database
  await queryPromise(
    "INSERT INTO otp(user_id, otp, expired_at) VALUES (?, ?, ?)",
    [user[0].user_id, otp, expiration]
  );

  // now we can send OTP to users email
  await sendEmail(email, "OTP for Registration", `<h1>Your OTP for registration is: ${otp}</h1>. <br>It will expire in 5 minutes.`);

  console.log(otp);
  return successResponse(res, "OTP sent successfully, please check your email", {});
});

/**
 * Verify password OTP
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const verifyPasswordOtp = tryCatch(async (req, res) => {
  const { otp } = req.body;

  const findOtp = await queryPromise("SELECT * FROM otp WHERE otp = ?", [otp]);
  if (findOtp.length === 0) {
    return errorResponse(res, "Invalid OTP", StatusCodes.BAD_REQUEST);
  }

  if (findOtp[0].expired_at < new Date()) {
    return errorResponse(
      res,
      "OTP has expired, please request a new one",
      StatusCodes.BAD_REQUEST
    );
  }

  await queryPromise("UPDATE otp SET status = 'active' WHERE otp = ?", [otp]);

  const token = generateToken({ userId: findOtp[0].user_id }, "1h");

  return successResponse(res, "Password OTP verified successfully", {token});
});

/**
 * Reset password
 * @param  req - The request object
 * @param  res - The response object
 * @returns successResponse | errorResponse
 */
export const resetPassword = tryCatch(async (req, res) => {
  const { user_id } = req.params;
  const {newPassword } = req.body;

  // Update user password
  const hashedPassword = await hashPassword(newPassword);
  await queryPromise("UPDATE users SET password_hash = ? WHERE user_id = ?", [
    hashedPassword,
    user_id,
  ]);

  return successResponse(res, "Password reset successfully", {});
});






