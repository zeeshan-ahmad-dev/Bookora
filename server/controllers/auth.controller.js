import {
  fetchUserService,
  registerUserService,
  sendVerificationOtpService,
  verifyAccountService,
  sendResetOtpService,
  verifyResetOtpService,
  resetPasswordService,
} from "../services/auth.service.js";

export const registerUserController = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const user = await registerUserService(
      firstName,
      lastName,
      email,
      password,
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
    next(error);
  }
};

export const fetchUserController = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await fetchUserService(_id);

    return res.status(201).json({
      success: true,
      message: "User data fetched",
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const sendVerficationOtpController = async (req, res, next) => {
  const user = req.user;

  try {
    await sendVerificationOtpService(user._id);

    res
      .status(200)
      .json({ success: true, message: "Verification otp sent to your email!" });
  } catch (error) {
    next(error);
  }
};

export const verifyAccountController = async (req, res, next) => {
  const { verificationOtp } = req.body;
  const user = req.user;

  try {
    await verifyAccountService(user._id, verificationOtp);

    res
      .status(200)
      .json({ success: true, message: "Your account has been verified!" });
  } catch (error) {
    next(error);
  }
};

export const sendResetOtpController = async (req, res, next) => {
  const { email } = req.body;
  try {
    await sendResetOtpService(email);

    res.status(200).json({
      success: true,
      message: "Reset Password otp sent to your email!",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyResetOtpController = async (req, res, next) => {
  const { resetOtp, email } = req.body;

  try {
    const token = await verifyResetOtpService(email, resetOtp);

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "IncorrectOtp!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Enter your new password!", token });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (req, res, next) => {
  const { token, newPassword } = req.body;

  try {
    await resetPasswordService(token, newPassword);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
};

export const isAuthController = async (req, res, next) => {
  if (!req.isAuthenticated) {
    return res.status(401).json({
      success: false,
      message: "Session expired. Please log in again.",
    });
  }

  res
    .status(200)
    .json({ success: true, message: "User is logged in!", user: req.user });
};
