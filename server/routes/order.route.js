import express from "express";
import { getOrderStatus } from "../controllers/order.controller.js"

const orderRoutes = express.Router();

orderRoutes.get('/status/:orderId', getOrderStatus);

export default orderRoutes;