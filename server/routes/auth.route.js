import express from 'express';
import { loginController, registerUserController, resetPasswordController, sendResetOtpController, sendVerficationOtpController, verifyAccountController, verifyResetOtpController, isAuthController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', registerUserController)
authRouter.post('/login', loginController)
authRouter.post('/send-verify-otp', sendVerficationOtpController)
authRouter.post('/verify-account', verifyAccountController)
authRouter.get('/is-auth', isAuthController)
authRouter.post('/send-reset-otp', sendResetOtpController)
authRouter.post('/verify-reset-otp', verifyResetOtpController)
authRouter.post('/reset-password', resetPasswordController)

export default authRouter;