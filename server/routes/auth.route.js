import express from 'express';
import { loginController, registerUserController, sendVerficationCodeController, verifyAccountController } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', registerUserController)
authRouter.post('/login', loginController)
authRouter.post('/send-verification-code', sendVerficationCodeController)
authRouter.post('/verify-account', verifyAccountController)

export default authRouter;