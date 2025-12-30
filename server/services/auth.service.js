import User from "../model/user.model.js";
import { throwErr } from "../utils/error.utils.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import transporter from "../config/nodemailer.js";
import jwt from "jsonwebtoken";

/**
 * Registers a new user to database
 * @param {string} name User's name
 * @param {email} email User's email
 * @param {password} password User's password
 * @param {googleId} googleId Id from google OAuth
 * @returns {Promise<object>} Returns user's object
 * @throws {Error} Throws an error if failed to create user
 */
export const registerUserService = async (name, email, password, googleId, pfp) => {
  try {
    const prevUser = await User.findOne({ email });

    if (prevUser) throwErr("User already exist with this email", 409);

    let user;

    if (googleId) {
      user = await User.create({
        name,
        email,
        authType: "google",
        isVerified: true,
        profilePicture: pfp
      })
    } else {
      const hashedPassword = await hashPassword(password);
      
      user = await User.create({
        name,
        email,
        password: hashedPassword,
      });
    }

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

    if (!user) throwErr("Incorrect email or password!");

    const isMatched = await comparePassword(password, user.password);

    if (!isMatched) throwErr("Incorrect email or password!");

    const safeUser = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isVerified: user.isVerified,
      authType: user.authType,
    };

    return safeUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Sends verification otp to user's email
 *
 * @param {string} userId The user's id
 * @returns {Promise<{success: boolean}>} Indicates whether the operation succeeded
 * @throws {Error} Throws an error if sending fails
 */
export const sendVerificationOtpService = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) throwErr("User not found", 404);

    const otp = Math.floor(100000 + Math.random() * 900000);

    await transporter.sendMail({
      from: `Bookora Store`,
      to: user.email,
      subject: "Verification Otp",
      html: `<h1>Your verification otp is: ${otp}`,
    });

    user.verificationOtp = otp;
    user.verificationOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Verifies a user's account
 *
 * @param {string} userId The user's id
 * @param {number} verificationOtp The otp sent to the user's email
 * @returns {Promise<{success: true}>} Indicates whether the account was verified successfully
 * @throws {Error} Throws an error if verification failed
 */
export const verifyAccountService = async (user, verificationOtp) => {
  try {
    if (!user) throwErr("User not found", 404);

    if (verificationOtp !== String(user.verificationOtp))
      return throwErr("incorrect OTP!", 401);
    if (Date.now() > user.verificationOtpExpiry)
      return throwErr("OTP is expired!", 401);

    user.verificationOtp = null;
    user.verificationOtpExpiry = null;
    user.isVerified = true;
    await user.save();

    return { success: true };
  } catch (error) {
    console.log("Error during verifying email", error);
    throw error;
  }
};

/**
 * Send's a reset password otp to user's email
 *
 * @param {string} email The email of the user
 * @returns {Promise<{success: true}>} Indicates whether otp was sent successfully
 * @throws {Error} Throws an error if sending fails
 */
export const sendResetOtpService = async (email) => {
  try {
    const user = await User.findOne({ email });

    if (!user) throwErr("User not found", 404);

    const otp = Math.floor(1000 + Math.random() * 9000);

    await transporter.sendMail({
      from: `Bookora Store`,
      to: user.email,
      subject: "Reset Password OTP",
      html: `<h1>Your password reset otp is: ${otp}`,
    });

    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    return { success: true };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Verifies the reset password otp for a user
 *
 * @param {string} email The email id of the user
 * @param {number} resetOtp The reset otp sent to user's email
 * @returns {Promise<string>} Returns a temporary token if otp verified
 * @throws {Error} Throws an error if verification failed
 */
export const verifyResetOtpService = async (email, resetOtp) => {
  try {
    const user = await User.findOne({ email });

    if (!user) throwErr("User not found", 404);

    if (resetOtp !== user.resetPasswordOtp)
      return throwErr("incorrect otp!", 401);
    if (Date.now() > user.resetPasswordOtpExpiry)
      return throwErr("The otp is expired otp is expired!", 401);

    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpiry = null;
    await user.save();

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });
    return token;
  } catch (error) {
    console.log("Error during verifying email", error);
    throw error;
  }
};

/**
 *
 * @param {string} token Temporaray token for verifiication
 * @param {string} newPassword The new password for account
 * @returns {Promise<{success: boolean>}} Indicates success if password was reset
 * @throws {Error} Throws an error if password reset failed
 */
export const resetPasswordService = async (token, newPassword) => {
  try {
    if (newPassword.length < 6) throwErr("Password too short", 400);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });

    if (!user) throwErr("Invalid token", 401);

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    return { success: true };
  } catch (error) {
    console.log("Token expired or invalid", error);
    throw error;
  }
};

/**
 *
 * @param {string} userId The id of the user
 * @returns {Promise<{success: boolean>}} Indicates if user's logged in
 * @throws {Error} Throws an error if not logged in
 */
const isAuthService = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throwErr("You are not logged in", 401);

    return { success: true };
  } catch (error) {
    console.log("User not logged in", error);
    throw error;
  }
};
