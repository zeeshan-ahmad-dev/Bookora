import User from "../model/user.model.js";
import { throwErr } from "../utils/error.utils.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import transporter from "../config/nodemailer.js";

/**
 * Registers a new user to database
 * @param {string} firstName User's first name
 * @param {string} lastName User's last name
 * @param {email} email User's email
 * @param {password} password User's password
 * @returns {Promise<object>} Returns user's object
 * @throws {Error} Throws an error if failed to create user
 */
export const registerUserService = async (firstName, lastName, email, password) => {
  try {
    const prevUser = await User.findOne({ email });

    if (prevUser) return throwErr("User already exist with this email", 409);

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Logs in a user 
 * 
 * @param {string} email The user's email address
 * @param {string} password The user's password
 * @returns {Promise<object>} Returns the user object if login is successful
 * @throws {Error} Throws an error if login fails
 */
export const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) return throwErr("Incorrect email or password!");

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) return throwErr("Incorrect email or password!");

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Sends verification code to user's email
 * 
 * @param {string} userId The user's id
 * @returns {Promise<{success: boolean}>} Indicates whether the operation succeeded
 * @throws {Error} Throws an error if sending fails  
 */
export const sendVerificationCodeController = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) return throwErr("User not found", 404);

    const code = Math.floor(1000 + Math.random() * 9000);

    await transporter.sendMail({
      from: `Bookora Store`,
      to: user.email,
      subject: "Verification Code",
      html: `<h1>Your verification code is: ${code}`
    })
    
    user.verificationCode = code;
    user.verificationCodeExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    return {success: true};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Verifies a user's account
 * 
 * @param {string} userId The user's id
 * @param {number} verificationCode The code sent to the user's email
 * @returns {Promise<{success: true}>} Indicates whether the account was verified successfully
 * @throws {Error} Throws an error if verification failed
 */
export const verifyAccountService = async (userId, verificationCode) => {
  try {
    const user = await User.findById(userId);

    if (!user) return throwErr("User not found", 404);

    if (verificationCode !== user.verificationCode) return throwErr("incorrect verification code!", 401);
    if (Date.now() > user.verificationCodeExpiry) return throwErr("Verification code is expired!", 401);

    user.verificationCode = null;
    user.verificationCodeExpiry = null;
    user.isVerified = true;
    await user.save();

    return {success: true};
  } catch (error) {
    console.log("Error during verifying email", error);
    throw error;
  }
}

/**
 * Send's a reset password code to user's email
 * 
 * @param {string} email The email of the user
 * @returns {Promise<{success: true}>} Indicates whether code was sent successfully
 * @throws {Error} Throws an error if sending fails
 */
export const sendResetPasswordCodeService = async (email) => {
  try {
    const user = await User.findOne({email});

    if (!user) return throwErr("User not found", 404);

    const code = Math.floor(1000 + Math.random() * 9000);

    await transporter.sendMail({
      from: `Bookora Store`,
      to: user.email,
      subject: "Reset Password Code",
      html: `<h1>Your password reset code is: ${code}`
    })
    
    user.resetPasswordCode = code;
    user.resetPasswordCodeExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    return {success: true};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Verifies the reset password code for a user
 * 
 * @param {string} email The email id of the user
 * @param {number} resetPasswordCode The reset code sent to user's email
 * @returns {Promise<{success: boolean}>} Indicates whether reset code was verified successfully
 * @throws {Error} Throws an error if verification failed 
 */
export const resetPasswordService = async (email, resetPasswordCode) => {
  try {
    const user = await User.findOne({email});

    if (!user) return throwErr("User not found", 404);

    if (resetPasswordCode !== user.resetPasswordCode) return throwErr("incorrect code!", 401);
    if (Date.now() > user.resetPasswordCodeExpiry) return throwErr("The code is expired code is expired!", 401);

    user.resetPasswordCode = null;
    user.resetPasswordCodeExpiry = null;
    await user.save();

    return {success: true};
  } catch (error) {
    console.log("Error during verifying email", error);
    throw error;
  }
}