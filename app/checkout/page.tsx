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

    // const items = cartItems.map((item: any) => ({
    //   variantId: item.variantId,
    //   quantity: item.quantity,
    //   pr
    // }));

    const items = cartItems.map(item => ({
  productId: item.productId,
  variantId: item.variantId,
  quantity: item.quantity,
}));

    // const payload = {
    //   items,
    //   customerName: `${formData.firstName} ${formData.lastName}`,
    //   customerEmail: formData.email,
    //   guestPhone: formData.phone,
    //   shippingAddress: formData.address,
    //   shippingCity: formData.city,
    //   shippingCountry: formData.country,
    //   shippingPostalCode: formData.zip,
    //   deliveryDate: formData.deliveryDate,
    //   deliveryTimeSlot: formData.deliveryTimeSlot,
    // };
    const payload = {
  items: cartItems.map((item) => ({
    variantId: item.variantId,
    quantity: item.quantity,
    productId: item.productId
  })),

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
    <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    <section className="bg-gray-100 min-h-screen py-6 md:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT : FORM */}
          <div className="lg:col-span-2 space-y-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-xl p-5 md:p-6 shadow-sm space-y-4"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                Delivery Details
              </h2>

              <input {...register("email")} placeholder="Email" required className="input" />
              <input {...register("phone")} placeholder="Phone" required className="input" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input {...register("firstName")} placeholder="First Name" required className="input" />
                <input {...register("lastName")} placeholder="Last Name" required className="input" />
              </div>

              <input {...register("address")} placeholder="Address" required className="input" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input {...register("city")} placeholder="City" required className="input" />
                <input {...register("country")} placeholder="Country" required className="input" />
                <input {...register("zip")} placeholder="Postal Code" required className="input" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="date" {...register("deliveryDate")} required className="input" />
                <select {...register("deliveryTimeSlot")} required className="input">
                  <option value="">Select Time Slot</option>
                  <option>09:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 01:00 PM</option>
                  <option>01:00 PM - 03:00 PM</option>
                  <option>03:00 PM - 06:00 PM</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[#b3008f] hover:bg-[#990077] text-white py-3 rounded-lg font-semibold transition"
              >
                Pay Now
              </button>
            </form>
          </div>

          {/* RIGHT : SUMMARY */}
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm h-fit lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3">
              {cartItems.map((item: any) => (
                <div key={item.variantId} className="flex gap-3">
                  <img
                    src={item.imageUrl}
                    className="w-14 h-14 rounded-md object-cover border"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 text-sm text-gray-700 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span className="text-[#b3008f]">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE STICKY PAY */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-4">
          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-[#b3008f] hover:bg-[#990077] text-white py-3 rounded-lg font-semibold"
          >
            Pay ₹{total}
          </button>
        </div>
      </div>
    </section>
  </>
);

}

