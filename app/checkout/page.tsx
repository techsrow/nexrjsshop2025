/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { checkoutService } from "@/services/checkoutService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { register, handleSubmit } = useForm();
  const { cartItems, clearCart } = useCart();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onSubmit = async (formData: any) => {
    if (cartItems.length === 0) {
      toast.error("❌ Cart is empty");
      return;
    }

    const items = cartItems.map((item: any) => ({
      productId: item.productId ?? item.id, // <-- IMPORTANT
      quantity: item.quantity,
    }));

    const basePayload = {
      items,
      shippingAddress: formData.address,
      shippingCity: formData.city,
      shippingCountry: formData.country,
      shippingPostalCode: formData.zip,
    };

    try {
      let response;

      if (isLoggedIn) {
        // Logged-in: you may pass email/name to override, else backend uses user record
        response = await checkoutService.createOrder({
          ...basePayload,
           customerEmail: formData.email || "unknown@example.com",
        customerName: `${formData.firstName} ${formData.lastName}`,
        guestPhone: formData.phone,
        });
      } else {
        // Guest: must include email & name
        response = await checkoutService.createGuestOrder({
          ...basePayload,
          customerEmail: formData.email,
          customerName: `${formData.firstName} ${formData.lastName}`,
          guestPhone: formData.phone,
        });
      }

      if (response?.success) {
        toast.success("✅ Order placed successfully!");
        // Save order number for success page, if present
        if (response.data?.orderNumber) {
          localStorage.setItem("lastOrderNumber", response.data.orderNumber);
        }
        clearCart();
        router.push("/order-success");
      } else {
        toast.error(response?.message || "Checkout failed");
      }
    } catch (error: any) {
      toast.error(error.message || "❌ Checkout failed");
    }
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: FORM */}
          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 bg-gray-800 p-6 rounded-xl border border-gray-700"
            >
              <h2 className="text-xl font-bold text-white">Contact Information</h2>

              {!isLoggedIn && (
                <>
                  <input
                    {...register("email")}
                    placeholder="Email"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  />

                  <input
                    {...register("phone")}
                    placeholder="Phone"
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                  />
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  {...register("firstName")}
                  placeholder="First Name"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                />
                <input
                  {...register("lastName")}
                  placeholder="Last Name"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                />
                <input
                {...register("phone")}
                placeholder="Phone Number"
                required
                type="tel"
                className=" bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              />

                
              </div>

              <input
                {...register("address")}
                placeholder="Shipping Address"
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  {...register("city")}
                  placeholder="City"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                />
                <input
                  {...register("country")}
                  placeholder="Country"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                />
                <input
                  {...register("zip")}
                  placeholder="Postal Code"
                  required
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <button
                type="submit"
                className="bg-amber-400 text-black w-full py-3 rounded-lg font-semibold hover:bg-amber-500"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>

            {cartItems.map((item) => (
              <div key={item.productId ?? item.productId} className="flex items-center gap-3 mb-4">
                <img
                  src={item.imageUrl || "/placeholder.png"}
                  className="w-16 h-16 rounded-lg object-cover"
                  alt={item.name}
                />
                <div>
                  <p className="text-white text-sm">{item.name}</p>
                  <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                  <p className="text-amber-400 text-sm">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            <div className="border-t border-gray-700 pt-3 text-white space-y-2">
              <p className="flex justify-between">
                <span>Subtotal</span> ₹{subtotal.toFixed(2)}
              </p>
              <p className="flex justify-between">
                <span>Shipping</span> {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
              </p>
              <p className="flex justify-between">
                <span>Tax</span> ₹{tax.toFixed(2)}
              </p>
              <p className="flex justify-between text-xl font-bold border-t border-gray-700 pt-3">
                <span>Total</span>
                <span className="text-amber-400">₹{total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
