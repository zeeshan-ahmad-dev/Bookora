import React from "react";
import { Link } from "react-router-dom";

export const CancelPayment = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-hero">
      <div className="w-full max-w-md p-10 text-center bg-white shadow-xl rounded-2xl">
        <div className="mb-4 text-6xl">❌</div>

        <h1 className="mb-2 text-3xl font-bold text-red-600 font-noto-serif">
          Payment Cancelled
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Your payment was not completed. Don't worry — no money was charged.
          You can try again anytime.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/checkout"
            className="py-3 font-semibold text-black transition rounded-lg bg-primary hover:bg-primary-hover"
          >
            Try Again
          </Link>

          <Link
            to="/"
            className="py-3 font-semibold text-gray-700 transition border rounded-lg border-black/10 hover:bg-black/5"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};