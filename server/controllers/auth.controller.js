import {
  registerUserService,
  loginService,
  sendVerificationOtpService,
  verifyAccountService,
  sendResetOtpService,
  verifyResetOtpService,
} from "../services/auth.service.js";

export const registerUserController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await registerUserService(
      firstName,
      lastName,
      email,
      password
    );

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    req.session.save((err) => {
      if (err) console.log(err);
      res.status(200).json({ success: true, message: "User created!", user });
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginService(email, password);

    req.session.userId = user._id;
    req.session.isAdmin = user.isAdmin;
    res
      .status(200)
      .json({ success: true, message: "User loged in successfully!", user });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const sendVerficationOtpController = async (req, res) => {
  const { userId } = req.session;
  try {
    await sendVerificationOtpService(userId);

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
  const { userId } = req.session;
  console.log(`User id: ${userId}`, req.session);

  try {
    await verifyAccountService(userId, verificationOtp);

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

export const isAuthController = async (req, res) => {
  const { userId } = req.session;
  try {
    if (!req.session || !req.session.userId)
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });

    await isAuthService(userId);

    res.status(200).json({ success: true, message: "User is logged in!" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
