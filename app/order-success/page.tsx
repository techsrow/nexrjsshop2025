/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    setOrderId(localStorage.getItem("lastOrderId"));
    setOrderNumber(localStorage.getItem("lastOrderNumber"));
  }, []);

  // ✅ If accessed directly without order
  if (!orderId && !orderNumber) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">No recent order found</h2>
          <Link
            href="/"
            className="bg-amber-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-amber-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-lg w-full">
        <h1 className="text-3xl font-bold text-amber-400 mb-4">
          ✅ Order Confirmed!
        </h1>

        <p className="text-lg mb-2">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <p className="text-gray-300 mt-3">
          <span className="font-semibold">Order ID:</span> {orderId}
        </p>

        <p className="text-gray-300">
          <span className="font-semibold">Order Number:</span> {orderNumber}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href="/"
            className="bg-amber-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-amber-500"
          >
            Continue Shopping
          </Link>

          <Link
            href="/orders"
            className="border border-gray-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </section>
  );
}
