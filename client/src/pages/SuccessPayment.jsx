import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export const SuccessPayment = () => {
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    (async () => {
      const orderId = localStorage.getItem("orderId");

      console.log("OrderId", orderId);

      const res = await api.get(`/orders/status/${orderId}`);
      console.log(res)
      if (res.data.payment_status === "paid") {
        console.log("Clearing cart");

        clearCart();
        localStorage.clear("orderId");
      }
    })();
  }, [])
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-hero">
      <div className="w-full max-w-md p-10 text-center bg-white shadow-xl rounded-2xl">
        <div className="mb-4 text-6xl animate-bounce">🎉</div>

        <h1 className="mb-2 text-3xl font-bold text-green-700 font-noto-serif">
          Payment Successful!
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Thank you for your purchase. Your order has been confirmed and is being processed.
          A confirmation email has been sent to you.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="py-3 font-semibold text-black transition rounded-lg bg-primary hover:bg-primary-hover"
          >
            Continue Shopping
          </Link>

          <Link
            to="/orders"
            className="py-3 font-semibold text-gray-700 transition border rounded-lg border-black/10 hover:bg-black/5"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
};
