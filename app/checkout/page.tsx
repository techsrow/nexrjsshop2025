/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { checkoutService } from "@/services/checkoutService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { register, handleSubmit } = useForm();
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 500 ? 0 : 50;
  const total = subtotal + shipping;

  // 🔑 RAZORPAY POPUP
  const openRazorpay = async (orderId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/razorpay/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ orderId }),
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
        description: "Order Payment",
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
            await clearCart();
            router.push("/order-success");
          } else {
            toast.error("Payment verification failed");
          }
        },
        theme: {
          color: "#fbbf24",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  // 🧾 SUBMIT CHECKOUT
  const onSubmit = async (formData: any) => {
    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    const items = cartItems.map((item: any) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    const payload = {
      items,
      customerName: `${formData.firstName} ${formData.lastName}`,
      customerEmail: formData.email,
      guestPhone: formData.phone,
      shippingAddress: formData.address,
      shippingCity: formData.city,
      shippingCountry: formData.country,
      shippingPostalCode: formData.zip,
      deliveryDate: formData.deliveryDate,
      deliveryTimeSlot: formData.deliveryTimeSlot,
    };

    try {
      const response = isLoggedIn
        ? await checkoutService.createOrder(payload)
        : await checkoutService.createGuestOrder(payload);

      if (response.success) {
        toast.success("Order created. Proceeding to payment...");
        await openRazorpay(response.data.orderId); // ✅ CRITICAL FIX
      } else {
        toast.error(response.message || "Checkout failed");
      }
    } catch (error: any) {
      toast.error(error.message || "Checkout failed");
    }
  };

  return (
    <>
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 bg-gray-800 p-6 rounded-xl"
            >
              <input {...register("email")} placeholder="Email" required className="input" />
              <input {...register("phone")} placeholder="Phone" required className="input" />

              <div className="grid grid-cols-2 gap-4">
                <input {...register("firstName")} placeholder="First Name" required className="input" />
                <input {...register("lastName")} placeholder="Last Name" required className="input" />
              </div>

              <input {...register("address")} placeholder="Address" required className="input" />

              <div className="grid grid-cols-3 gap-4">
                <input {...register("city")} placeholder="City" required className="input" />
                <input {...register("country")} placeholder="Country" required className="input" />
                <input {...register("zip")} placeholder="Postal Code" required className="input" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input type="date" {...register("deliveryDate")} required className="input" />
                <select {...register("deliveryTimeSlot")} required className="input">
                  <option value="">Select Time Slot</option>
                  <option>09:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 01:00 PM</option>
                  <option>01:00 PM - 03:00 PM</option>
                  <option>03:00 PM - 06:00 PM</option>
                </select>
              </div>

              <button className="bg-amber-400 w-full py-3 rounded-lg font-semibold">
                Pay Now
              </button>
            </form>
          </div>

          {/* SUMMARY */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-white text-xl mb-4">Order Summary</h2>

            {cartItems.map((item: any) => (
              <div key={item.variantId} className="flex gap-3 mb-3">
                <img src={item.imageUrl} className="w-16 h-16 rounded" />
                <div>
                  <p className="text-white">{item.name}</p>
                  <p className="text-gray-400 text-sm">
                    Qty {item.quantity}
                  </p>
                  <p className="text-amber-400">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t pt-3 text-white">
              <p className="flex justify-between">Subtotal ₹{subtotal}</p>
              <p className="flex justify-between">Shipping ₹{shipping}</p>
              <p className="flex justify-between text-xl text-amber-400">
                Total ₹{total}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
