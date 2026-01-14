import React, { useEffect, useState } from "react";
import api from "../api";

const paymentStatusStyles = {
  paid: "bg-green-100 text-green-700 border border-green-200",
  pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  failed: "bg-red-100 text-red-700 border border-red-200",
  cancelled: "bg-red-100 text-red-700 border border-red-200",
};

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await api.get("/orders");
      setOrders(res?.data?.orders || []);
    })();
  }, []);

  return (
    <section className="bg-secondary px-2 sm:px-4 md:px-16 py-12 min-h-screen">
      {/* Page Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-noto-serif font-bold">
          My Orders
        </h1>
        <p className="text-sm text-black/70 mt-2">
          View your recent purchases and order history
        </p>
      </div>

      {/* Orders */}
      <div className="max-w-4xl mx-auto space-y-8">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-black/10 rounded-lg p-6"
          >
            {/* Header */}
            <div className="flex justify-between items-start sm:items-center mb-4 gap-2">
              <div>
                <p className="text-sm text-black/60">Order ID</p>
                <p className="font-semibold break-all">{order._id}</p>
                <p className="text-sm text-black/60 mt-1.5">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <span
                className={`text-sm px-4 py-1 mt-2 sm:mt-1 rounded-full font-medium capitalize ${
                  paymentStatusStyles[order.payment_status?.toLowerCase()] ||
                  "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {order.payment_status}
              </span>
            </div>

            {/* Items */}
            <div className="space-y-3 mt-4 mb-5 overflow-x-auto">
              {order?.products?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm border-b border-black/5 pb-2 gap-2"
                >
                  <div className="flex gap-4 items-center flex-1 min-w-0">
                    <img
                      className="w-12 h-16 object-cover rounded bg-black/5"
                      src={item.cover || "/placeholder-book.png"}
                      alt={item.title}
                    />
                    <div className="flex flex-col truncate">
                      <span className="font-medium truncate">{item.title}</span>
                      <span className="text-xs text-black/60">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  </div>
                  <span className="text-black/70 mt-1 sm:mt-0">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-black/10 gap-1">
              <span className="font-noto-serif font-semibold text-lg">Total</span>
              <span className="font-semibold text-lg">${order.amount.toFixed(2)}</span>
            </div>
          </div>
        ))}

        {/* No orders message */}
        {orders?.length === 0 && (
          <p className="text-center text-black/60 mt-10">
            You have no orders yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default Order;
