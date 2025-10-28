import { registerUserService, loginService } from '../services/auth.service.js';

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
        const user = await loginService(firstName, lastName, email, password);

        req.session.userId = user._id;
        req.session.isAdmin = user.isAdmin;
        res.status(200).json({ success: true, message: "User loged in successfully!", user });
    } catch (error) {
        res.status(error.status || 500).json({success: false, message: error.message});
    }
}