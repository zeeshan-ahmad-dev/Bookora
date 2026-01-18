import Cart from "../model/cart.model.js";
import Book from "../model/book.model.js";
import { throwErr } from "../utils/error.utils.js";

/**
 * Fetches the user's cart with populated book details
 *
 * @param {string} userId The user's ID
 * @returns {Promise<Array<Object>>} List of cart items
 * @throws {Error} Throws an error if cart retrieval fails
 */
export const getCartService = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId }).populate("items.book").lean();

    if (!cart || !cart.items || cart.items.length === 0) return [];

    cart = cart.items.map((item) => ({
      ...item.book,
      quantity: item.quantity,
      price: item.price,
    }));

    return cart;
  } catch (error) {
    throwErr("Error fetching cart", error.status || 500);
  }
};

/**
 * Adds item to cart
 *
 * @param {string} userId The user's ID
 * @param {string} userId The books's ID
 * @param {number} userId The number of books to be added
 * @returns {Promise<Array<Object>>} List of cart items
 * @throws {Error} Throws an error if cart retrieval fails
 */
export const addItemToCartService = async (userId, bookId, quantity) => {
  try {
    quantity = Number(quantity);

    if (quantity <= 0) {
      throwErr("Quantity should be a positive integer", 400);
    }

    let cart = await Cart.findOne({ user: userId });
    let book = await Book.findById(bookId);

    if (!cart) {
      cart = await Cart.create({
        user: userId,
        items: [{ book: bookId, price: book.price.toFixed(2), quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.book.toString() === bookId.toString()
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ book: bookId, price: book.price.toFixed(2), quantity });
      }

      await cart.save();
    }

    let populatedCart = await getCartService(userId);

    return populatedCart;
  } catch (error) {
    throwErr("Error adding item to cart", error.status || 500);
  }
};

/**
 * Removes item to cart
 *
 * @param {string} userId The user's ID
 * @param {string} userId The books's ID
 * @returns {Promise<Array<Object>>} List of cart items
 * @throws {Error} Throws an error if cart retrieval fails
 */
export const removeItemToCartService = async (userId, bookId) => {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throwErr("Cart not found for the user", 404);
    }
    
    const initialLength = cart.items.length;

    cart.items = cart.items.filter(item => item.book.toString() !== bookId.toString());

    if (cart.items.length === initialLength) {
      throwErr("Book not found in cart", 404);
    }

    await cart.save();

    let populatedCart = await getCartService(userId)

    return populatedCart;
  } catch (error) {
    throwErr("Error removing item from cart", error.status || 500);
  }
};

/**
 * Updates cart by adding or removing books
 *
 * @param {string} userId The user's ID
 * @param {object} updateCartArray Array of updated books
 * @returns {Promise<Array<Object>>} List of cart items
 * @throws {Error} Throws an error if cart retrieval fails
 */
export const updateCartService = async (userId, updatedCartArray) => {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throwErr("Cart not found for the user", 404);
    }
    
    const initialLength = cart.items.length;
    
    // removes items from cart which are not in updateCartArray
    if (updatedCartArray.length !== initialLength) {
      const updatedBookIds = new Set(
        updatedCartArray.map(book => book._id)
      );

      cart.items = cart.items.filter(item => updatedBookIds.has(item.book.toString()));
    }

    updatedCartArray.forEach(book => {
      cart.items = cart.items.map(item => item.book.toString() === book._id.toString() ? {...item, quantity: book.quantity} : item);
    });

    await cart.save();

    let populatedCart = await getCartService(userId)

    return populatedCart;
  } catch (error) {
    throwErr("Error updating cart", error.status || 500);
  }
};

/**
 * Clears cart of the user
 *
 * @param {string} userId The user's ID
 * @returns {Promise<Array>} An empty array
 * @throws {Error} Throws an error if cart retrieval fails
 */
export const clearCartService = async (userId) => {
  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      throwErr("Cart not found for the user", 404);
    }
    
    cart.items = [];
    await cart.save();

    return cart;
  } catch (error) {
    throwErr(error.message || "Error updating cart", error.status || 500);
  }
};