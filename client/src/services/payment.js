import api from "../api";
import { loadStripe } from "@stripe/stripe-js";

export const makePayment = async (cart) => {
    try {
      // Call backend to create stripe session
      const response = await api.post("payment/create-checkout-session", {
        products: cart,
      });

      localStorage.setItem("orderId", response.data.orderId);

      await loadStripe(
        "pk_test_51SnpVF90s5HCyBqaQfZvwWFpVwO4Fm468EQrinLjQXVID2iYzSphTFIkt70XCYdA9Skm1Kx279keZ2Z420NL5vpP00IKIotMOR",
      );

      // Redirect to stripe checkout
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Payment error:", error);
    }
  };