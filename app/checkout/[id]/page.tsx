/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function BuyNowCheckoutPage() {
  const { id } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Customer fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("India");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("");

  // 🔹 Load Buy-Now Order
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/buy-now/${id}`
        );
        const data = await res.json();

        if (data.success) setOrder(data.data);
        else toast.error("Order not found");
      } catch {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadOrder();
  }, [id]);

  // 🔹 Razorpay Popup
  const openRazorpay = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ orderId: order.id }),
        }
      );

      const data = await res.json();
      if (!data.success) {
        toast.error("Unable to start payment");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.data.amount,
        currency: "INR",
        order_id: data.data.razorpayOrderId,
        name: "Crescent Healthcare",
        description: "Buy Now Payment",
        handler: async (response: any) => {
          const verify = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/razorpay/verify-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verify.json();

          if (verifyData.success) {
            toast.success("Payment successful 🎉");
            router.push("/order-success");
          } else {
            toast.error("Payment verification failed");
          }
        },
        theme: { color: "#fbbf24" },
      };

      new window.Razorpay(options).open();
    } catch {
      toast.error("Payment failed");
    }
  };

  // 🔹 Confirm Order + Pay
  const confirmOrder = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/buy-now/confirm`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: id,
            name,
            phone,
            address,
            city,
            postal,
            country,
            deliveryDate,
            deliveryTimeSlot,
          }),
        }
      );

      const result = await res.json();

      if (result.success) {
        toast.success("Order confirmed, proceed to payment");
        await openRazorpay(); // ✅ PAY NOW
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("Unable to confirm order");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!order) return <p className="text-center text-red-500">Order not found</p>;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="py-12 bg-gray-900 text-white">
        <div className="max-w-3xl mx-auto px-6">

          <h1 className="text-xl font-bold mb-6">Buy Now Checkout</h1>

          {/* ORDER DETAILS */}
          <div className="bg-gray-800 p-6 rounded-xl mb-6">
            <h2 className="text-lg font-semibold mb-3">
              Order #{order.orderNumber}
            </h2>

            {order.items.map((item: any) => (
              <div key={item.variantId} className="border-b border-gray-700 mb-2 pb-2">
                <p>{item.productName}</p>
                <p className="text-gray-400 text-sm">
                  {[item.variant?.size, item.variant?.color, item.variant?.weight]
                    .filter(Boolean)
                    .join(" / ")}
                </p>
                <p>
                  {item.quantity} × ₹{Number(item.unitPrice).toFixed(2)}
                </p>
              </div>
            ))}

            <p className="mt-4 text-lg font-semibold">
              Total: <span className="text-amber-400">₹{order.totalAmount}</span>
            </p>
          </div>

          {/* CUSTOMER FORM */}
          <form onSubmit={confirmOrder} className="bg-gray-800 p-6 rounded-xl space-y-4">

            <input className="input" placeholder="Full Name" required value={name}
              onChange={(e) => setName(e.target.value)} />

            <input className="input" placeholder="Phone" required value={phone}
              onChange={(e) => setPhone(e.target.value)} />

            <textarea className="input" placeholder="Address" required value={address}
              onChange={(e) => setAddress(e.target.value)} />

            <div className="grid grid-cols-3 gap-3">
              <input className="input" placeholder="City" required value={city}
                onChange={(e) => setCity(e.target.value)} />
              <input className="input" placeholder="Postal Code" required value={postal}
                onChange={(e) => setPostal(e.target.value)} />
              <input className="input" placeholder="Country" required value={country}
                onChange={(e) => setCountry(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="date" className="input" required value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)} />
              <select className="input" required value={deliveryTimeSlot}
                onChange={(e) => setDeliveryTimeSlot(e.target.value)}>
                <option value="">Select Time Slot</option>
                <option>09:00 AM - 11:00 AM</option>
                <option>11:00 AM - 01:00 PM</option>
                <option>01:00 PM - 03:00 PM</option>
                <option>03:00 PM - 06:00 PM</option>
              </select>
            </div>

            <button className="w-full bg-amber-400 text-black py-3 rounded-lg font-semibold">
              Pay Now
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
