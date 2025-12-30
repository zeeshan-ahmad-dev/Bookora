import {
  registerUserService,
  sendVerificationOtpService,
  verifyAccountService,
  sendResetOtpService,
  verifyResetOtpService,
} from "../services/auth.service.js";
// import { OAuth2Client } from "google-auth-library";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

export const registerUserController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await registerUserService(
      firstName,
      lastName,
      email,
      password
    );

    req.login(user, (err) => {
      if (err) return next(err);

      return res.status(201).json({
        success: true,
        message: "User registered & logged in",
        user: req.user,
      });
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const sendVerficationOtpController = async (req, res) => {
  const user = req.session.user;
  try {
    await sendVerificationOtpService(user);

    res
      .status(200)
      .json({ success: true, message: "Verification otp sent to your email!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const verifyAccountController = async (req, res) => {
  const { verificationOtp } = req.body;
  const user = req.session.user;

  try {
    await verifyAccountService(user, verificationOtp);

    res
      .status(200)
      .json({ success: true, message: "Your account has been verified!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const sendResetOtpController = async (req, res) => {
  const { email } = req.body;
  try {
    await sendResetOtpService(email);

    res.status(200).json({
      success: true,
      message: "Reset Password otp sent to your email!",
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const verifyResetOtpController = async (req, res) => {
  const { resetOtp, email } = req.body;
  try {
    const token = await verifyResetOtpService(email, resetOtp);

    res
      .status(200)
      .json({ success: true, message: "Enter your new password!", token });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    await resetPasswordService(token, newPassword);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

// Ask ChatGPT for explanation
export const logoutController = async (req, res) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    })
  });
};

export const isAuthController = async (req, res) => {
  if (!req.isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }

  res.status(200).json({ success: true, message: "User is logged in!", user: req.user });
};
