import { addItemToCartService, removeItemToCartService, getCartService, updateCartService } from "../services/cart.service.js";

export const getCartController = async (req, res) => {
  const { userId } = req.session;

  try {
    const cart = await getCartService(userId);

    res
      .status(200)
      .json({ success: true, message: "Cart fetched successfully!", cart });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const addItemToCartController = async (req, res) => {
  const { userId } = req.session;
  const { bookId, quantity } = req.body;

  try {
    const cart = await addItemToCartService(userId, bookId, quantity);

    res
      .status(200)
      .json({ success: true, message: "Book added to cart!", cart });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const removeItemToCartController = async (req, res) => {
  const { userId } = req.session;
  const { bookId } = req.body;

  try {
    const cart = await removeItemToCartService(userId, bookId);

    res
      .status(200)
      .json({ success: true, message: "Book removed from cart!", cart });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};

export const updateCartController = async (req, res) => {
  const { userId } = req.session;
  const { updatedCart } = req.body;

  try {
    const cart = await updateCartService(userId, updatedCart);

    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully!", cart });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ success: false, message: error.message });
  }
};
