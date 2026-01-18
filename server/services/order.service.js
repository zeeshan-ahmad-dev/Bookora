import Order from "../model/order.model.js";
import { throwErr } from "../utils/error.utils.js";

// Returns cart of the user
export const fetchOrdersService = async (userId) => {
  try {
    let orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

    if (!orders.length) return [];

    return orders;
  } catch (error) {
    console.error(error);
    throwErr(error.message, error.status || 500);
  }
};