import express from 'express';
import { loginController, registerUserController } from '../controllers/auth.controller.js';

const cartRouter = express.Router();

cartRouter.post('/register', registerUserController)
cartRouter.post('/login', loginController)

export default cartRouter;