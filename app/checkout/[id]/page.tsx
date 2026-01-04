/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState("");

  const [country, setCountry] = useState("India");
  

  // Load Order
  useEffect(() => {
    const loadOrder = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buy-now/${id}`);
        const data = await res.json();

        if (data.success) setOrder(data.data);
        else toast.error("Order not found!");
      } catch (error) {
        toast.error("Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    if (id) loadOrder();
  }, [id]);

  // Submit Customer Info
  const confirmOrder = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buy-now/confirm`, {
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
      });

      console.log("BUY NOW PAYLOAD:", {
  deliveryDate,
  deliveryTimeSlot
});


      const result = await res.json();

      if (result.success) {
        toast.success("Order confirmed!");
        router.push("/order-success");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Unable to place order");
    }
  };

  if (loading) return <p className="text-center text-gray-400">Loading...</p>;
  if (!order) return <p className="text-center text-red-500">Order not found</p>;

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-1xl font-bold mb-6 cart-pad">Buy Now Checkout</h1>

        {/* ORDER DETAILS */}
        <div className="bg-gray-800 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-3">
            Order #{order.orderNumber}
          </h2>

          {order.items.map((item: any) => (
            <div key={item.productId} className="border-b border-gray-700 pb-2 mb-2">
              <p>{item.productName}</p>
              <p className="text-gray-400 text-sm">
                {item.quantity} × ₹{Number(item.unitPrice).toFixed(2)}
              </p>
            </div>
          ))}

          <p className="text-lg font-semibold mt-4">
            Total: <span className="text-amber-400">₹{Number(order.totalAmount).toFixed(2)}</span>
          </p>
        </div>

        {/* CUSTOMER FORM */}
        <form onSubmit={confirmOrder} className="bg-gray-800 p-6 rounded-xl space-y-4">

          <h2 className="text-xl font-semibold mb-3">Customer Information</h2>

          <input className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            placeholder="Full Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <div className="grid grid-cols-3 gap-3">
            <input className="p-3 rounded bg-gray-700 border border-gray-600"
              placeholder="City"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input className="p-3 rounded bg-gray-700 border border-gray-600"
              placeholder="Postal Code"
              required
              value={postal}
              onChange={(e) => setPostal(e.target.value)}
            />
            <input className="p-3 rounded bg-gray-700 border border-gray-600"
              placeholder="Country"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <h2 className="text-xl font-semibold mt-4">Delivery Schedule</h2>

<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  <input
    type="date"
    className="p-3 rounded bg-gray-700 border border-gray-600"
    required
    min={new Date().toISOString().split("T")[0]}
    value={deliveryDate}
    onChange={(e) => setDeliveryDate(e.target.value)}
  />

  <select
    className="p-3 rounded bg-gray-700 border border-gray-600"
    required
    value={deliveryTimeSlot}
    onChange={(e) => setDeliveryTimeSlot(e.target.value)}
  >
    <option value="">Select Time Slot</option>
    <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
    <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
    <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
    <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
  </select>
</div>


          <button className="w-full bg-amber-400 text-black py-3 rounded-lg font-semibold hover:bg-amber-500">
            Confirm Order
          </button>
        </form>
      </div>
    </section>
  );
}
