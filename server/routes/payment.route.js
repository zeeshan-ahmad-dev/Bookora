import express from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/create-checkout-session", createCheckoutSession);

export default paymentRoutes;