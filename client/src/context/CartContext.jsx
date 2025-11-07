import { createContext, useEffect, useState } from "react";
import api from "../api";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const addBookToCart = async (bookId) => {
    try {
      if (cart.some((book) => book.id === bookId)) return;
      const res = await api.get(`/books/${bookId}`);

      setCart((prev) => {
        const newCart = [...prev, { ...res.data.book, quantity: 1 }];
        localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeBookFromCart = async (bookId) => {
    setCart((prev) => {
      const newCart = prev.filter((book) => book._id !== bookId);
      console.log(prev);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const changeQuantity = async (bookId, quantity) => {
    const updatedCart = cart.map((book) =>
      book._id === bookId ? { ...book, quantity: book.quantity++ } : book
    );

    setCart(updatedCart);
    localStorage.setItem("cart", updatedCart);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);
  
  useEffect(() => {
    const total = cart.reduce((sum, book) => sum + book.price, 0);
    setSubtotal(total);
    console.log(cart);
  }, [cart]);

  const value = {
    cart,
    subtotal,
    addBookToCart,
    removeBookFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
