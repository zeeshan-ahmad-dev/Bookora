import express from "express";
import passport from "passport";
import {
  fetachUserController,
  logoutController,
  registerUserController,
  resetPasswordController,
  sendResetOtpController,
  sendVerficationOtpController,
  verifyAccountController,
  verifyResetOtpController,
  isAuthController,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.get("/user", fetachUserController);
authRouter.post("/register", registerUserController);
authRouter.post("/logout", logoutController);
authRouter.post("/send-verify-otp", sendVerficationOtpController);
authRouter.post("/verify-account", verifyAccountController);
authRouter.get("/is-auth", isAuthController);
authRouter.post("/send-reset-otp", sendResetOtpController);
authRouter.post("/verify-reset-otp", verifyResetOtpController);
authRouter.post("/reset-password", resetPasswordController);

authRouter.post(
  "/login",
  passport.authenticate("local", { failureMessage: true, failWithError: true }),
  (req, res) => {
    res.status(200).json({ success: true, message: "Logged in successfully", user: req.user });
  }
);

authRouter.get(
  "/google",
  // redirects to google account chooser
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }), // middleware
  (req, res) => {
    res.redirect("http://localhost:5173/auth/success");
  }
);

export default authRouter;