import { createContext, useEffect, useState } from "react";
import api from "../api";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const addBookToCart = async (bookId, quantity = 1) => {
    try {
      // todo: Remove fetching here and pass only bookId into cart request and pass price everything there
      const res = await api.get(`/books/${bookId}`);
      const book = res.data.book;

      const cartRes = await api.post("/cart/add-book", {
        bookId,
        price: book.price,
        quantity,
      });

      setCart(cartRes.data.cart);
      localStorage.setItem("cart", JSON.stringify(cartRes.data.cart));
    } catch (error) {
      console.error(error);
    }
  };

  const removeBookFromCart = async (bookId) => {
    try {
      const { data } = await api.post("/cart/remove-book", {
        bookId,
      });

      setCart(data.cart);
    } catch (error) {}
  };

  const changeQuantity = async (bookId, quantity) => {
    const updatedCart = cart.map((book) =>
      book._id === bookId ? { ...book, quantity: quantity } : book
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // todo: Use proper updated cart logic with backend
  const setUpdatedCart = async (updatedCart) => {
    
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const initializeCart = async () => {
    const { data } = await api.get("/cart");
    
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
    initializeCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
