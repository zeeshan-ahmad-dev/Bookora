import Cart from "../model/cart.model.js";
import { throwErr } from "../utils/error.utils.js";

// Returns cart of the user
export const getCartService = async (userId) => {
  try {
    let populatedCart = await Cart.findOne({ user: userId }).populate("items.book").lean();

    populatedCart = populatedCart.items.map((item) => ({
      ...item.book,
      quantity: item.quantity,
      price: item.price,
    }));

    if (!populatedCart) return [];

    return populatedCart;
  } catch (error) {
    console.error(error);
    throwErr("Error fetching cart", 500);
  }
};

// Adds Item to cart and returns updated Cart
export const addItemToCartService = async (userId, bookId, price, quantity) => {
  try {
    quantity = Number(quantity);

    if (quantity <= 0) {
      throwErr("Quantity should be a positive integer", 400);
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ book: bookId, price, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId.toString()
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ book: bookId, price, quantity });
      }

      await cart.save();
    }

    let populatedCart = await getCartService(userId);

    return populatedCart;
  } catch (error) {
    console.error(error);
    throwErr("Error adding item to cart", 500);
  }
};

// Removes Item to cart and returns updated Cart
export const removeItemToCartService = async (userId, bookId) => {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throwErr("Cart not found for the user", 404);
    }
    
    const initialLength = cart.items.length;

    cart.items = cart.items.filter(item => item.book.toString() != bookId.toString());

    if (cart.items.length === initialLength) {
      throwErr("Book not found in cart", 404);
    }

    await cart.save();

    let populatedCart = await getCartService(userId)

    return populatedCart;
  } catch (error) {
    console.error(error);
    throwErr("Error removing item from cart", 500);
  }
};
