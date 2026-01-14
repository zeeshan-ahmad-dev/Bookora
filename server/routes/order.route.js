import express from "express";
import { getOrderStatus, fetchOrdersController } from "../controllers/order.controller.js"

const orderRoutes = express.Router();

orderRoutes.get('/', fetchOrdersController);
orderRoutes.get('/status/:orderId', getOrderStatus);

export default orderRoutes;