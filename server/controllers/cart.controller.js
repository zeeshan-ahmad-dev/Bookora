import { addItemToCartService, removeItemToCartService, getCartService, updateCartService, clearCartService } from "../services/cart.service.js";

export const getCartController = async (req, res, next) => {
  const userId = req.user._id;

  try {
    const cart = await getCartService(userId);

    res
      .status(200)
      .json({ success: true, message: "Cart fetched successfully!", cart });
  } catch (error) {
    next(error);
  }
};

export const addItemToCartController = async (req, res, next) => {
  const userId = req.user._id;
  const { bookId, quantity } = req.body;

  try {
    const cart = await addItemToCartService(userId, bookId, quantity);

    res
      .status(201)
      .json({ success: true, message: "Book added to cart!", cart });
  } catch (error) {
    next(error);
  }
};

export const removeItemToCartController = async (req, res, next) => {
  const userId = req.user._id;
  const { bookId } = req.params;

  try {
    const cart = await removeItemToCartService(userId, bookId);

    res
      .status(200)
      .json({ success: true, message: "Book removed from cart!", cart });
  } catch (error) {
    next(error);
  }
};

export const updateCartController = async (req, res, next) => {
  const userId = req.user._id;
  const { updatedCart } = req.body;

  try {
    const cart = await updateCartService(userId, updatedCart);

    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully!", cart });
  } catch (error) {
    next(error);
  }
};

export const clearCartController = async (req, res, next) => {
  const userId = req.user._id;

  try {
    await clearCartService(userId);

    res
      .status(204).end();
  } catch (error) {
    next(error);
  }
};
