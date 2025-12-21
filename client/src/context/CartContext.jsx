import { createContext, useEffect, useState } from "react";
import api from "../api";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [updatingIds, setUpdatingIds] = useState(new Set());

  const addBookToCart = async (bookId, quantity = 1) => {
    try {
      setUpdatingIds((prev) => new Set(prev).add(bookId));

      const cartRes = await api.post("/cart/add-book", {
        bookId,
        quantity,
      });

      setCart(cartRes.data.cart);
      localStorage.setItem("cart", JSON.stringify(cartRes.data.cart));
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingIds((prev) => {
        let s = new Set(prev);
        s.delete(bookId);
        return s;
      })
    }
  };

  const removeBookFromCart = async (bookId) => {
    try {
      setUpdatingIds((prev) => new Set(prev).add(bookId));

      setCart((prev) => {
        let updatedCart = prev.filter(book => book._id !== bookId);
        return updatedCart;
      });

      const { data } = await api.post("/cart/remove-book", {
        bookId,
      });

      setCart(data.cart);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingIds((prev) => {
        let s = new Set(prev);
        s.delete(bookId);
        return s;
      })
    }
  };

  const changeQuantity = async (bookId, quantity) => {
    const updatedCart = cart.map((book) =>
      book._id === bookId ? { ...book, quantity: quantity } : book
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const setUpdatedCart = async (updatedCart) => {
    try {
      const { data } = await api.post("/cart/update-cart", {
        updatedCart
      });

      setCart(data.cart);
      localStorage.setItem("cart", JSON.stringify(data.cart));
    } catch (error) {
      console.error(error);
    }
  };

  const initializeCart = async () => {
    const { data } = await api.get("/cart");

    if (!data.cart) data.cart = [];
    
    setCart(data.cart);
    localStorage.setItem("cart", JSON.stringify(data.cart));
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    initializeCart();
  }, []);

  useEffect(() => {
    const total = cart.reduce((sum, book) => sum + (book.price * book.quantity), 0);
    setSubtotal(total?.toFixed(2));
  }, [cart]);

  const value = {
    cart,
    subtotal,
    addBookToCart,
    removeBookFromCart,
    changeQuantity,
    setUpdatedCart,
    initializeCart,
    updatingIds,
    setUpdatingIds
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
