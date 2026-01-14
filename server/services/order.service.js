import Order from "../model/order.model.js";
import { throwErr } from "../utils/error.utils.js";

// Returns cart of the user
export const fetchOrdersService = async (userId) => {
  try {
    console.log("UserId from FetchORders", userId)
    let orders = await Order.find({ user: userId });

    if (!orders.length) return [];

    return orders;
  } catch (error) {
    console.error(error);
    throwErr(error.message, error.status || 500);
  }
};