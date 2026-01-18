import Order from "../model/order.model.js";
import { throwErr } from "../utils/error.utils.js";

/**
 * Fetches Orders of user
 *
 * @param {string} userId The user's ID
 * @returns {Promise<Array<Object>>} List of order items
 * @throws {Error} Throws an error if order retrieval fails
 */
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