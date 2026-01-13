import Order from '../model/order.model.js';

// create service file
export const getOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    try {
        const order = await Order.findById(orderId);

        res.status(200).json({ orderId: order._id, payment_status: order.payment_status });
    } catch (error) {
        console.log("Error fetching status for an order", error.message);
        res.status(500).json(error);
    }
}