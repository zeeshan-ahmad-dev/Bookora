import express from 'express';
import passport from 'passport';
import { loginController, logoutController, registerUserController, resetPasswordController, sendResetOtpController, sendVerficationOtpController, verifyAccountController, verifyResetOtpController, isAuthController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', registerUserController)
authRouter.post('/login', loginController)
authRouter.post('/logout', logoutController)
authRouter.post('/send-verify-otp', sendVerficationOtpController)
authRouter.post('/verify-account', verifyAccountController)
authRouter.get('/is-auth', isAuthController)
authRouter.post('/send-reset-otp', sendResetOtpController)
authRouter.post('/verify-reset-otp', verifyResetOtpController)
authRouter.post('/reset-password', resetPasswordController)

authRouter.get("/google", 
    passport.authenticate("google", {
        scope: ["profile", "email"]
    })
);
authRouter.get('/google/callback', 
    passport.authenticate("google", {failureRedirect: "http://localhost:5173/login"}), 
    (req, res) => {
        res.redirect("http://localhost:5173/auth/success")
    }
);

export default authRouter;