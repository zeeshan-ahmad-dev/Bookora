import { registerUserService, loginService, sendVerificationCodeService, verifyAccountService, sendResetPasswordCodeService, resetPasswordService } from '../services/auth.service.js';

export const registerUserController = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try {
        const user = await registerUserService(firstName, lastName, email, password);

        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;
        res.status(200).json({ success: true, message: "User created successfully!", user });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message: error.message});
    }
}

export const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginService(email, password);

        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;
        res.status(200).json({ success: true, message: "User loged in successfully!", user });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message: error.message});
    }
}

export const sendVerficationCodeController = async (req, res) => {
    const { userId } = req.session;
    try {
        await sendVerificationCodeService(userId);

        res.status(200).json({ success: true, message: "Verification code sent to your email!" });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message: error.message});
    }
}

export const verifyAccountController = async (req, res) => {
    const { verificationCode } = req.body;
    const { userId } = req.session;
    try {
        await verifyAccountService(userId, verificationCode);

        res.status(200).json({ success: true, message: "Your account has been verified!" });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message: error.message});
    }
}

export const sendResetPasswordCodeController = async (req, res) => {
    const { email } = req.body;
    try {
        await sendResetPasswordCodeService(email);

        res.status(200).json({ success: true, message: "Reset Password Code sent to your email!" });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message: error.message});
    }
}

export const resetPasswordCodeController = async (req, res) => {
    const { verificationCode } = req.body;
    const { userId } = req.session;
    try {
        await resetPasswordService(userId, verificationCode);

        res.status(200).json({ success: true, message: "Enter your new password!" });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message: error.message});
    }
}