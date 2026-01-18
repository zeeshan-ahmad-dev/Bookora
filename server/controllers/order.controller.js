import Order from '../model/order.model.js';
import { fetchOrdersService } from '../services/order.service.js';

// create service file
export const getOrderStatus = async (req, res, next) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId);

        res.status(200).json({ orderId: order._id, payment_status: order.payment_status });
    } catch (error) {
        next(error);
    }
}

// create service file
export const fetchOrdersController = async (req, res, next) => {
    const userId = req.user._id;
    try {
        const orders = await fetchOrdersService(userId);

        res.status(200).json({ orders });
    } catch (error) {
        console.log("Error fetching orders", error.message);
        res.status(error.status || 500).json(error);
    }
}