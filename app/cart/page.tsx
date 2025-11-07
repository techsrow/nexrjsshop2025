"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, removeItem, updateQuantity, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <section className="py-16 bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p>Your cart is empty.</p>
                <Link
                  href="/products"
                  className="mt-4 inline-block border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black px-6 py-3 rounded-lg"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.productId} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                    <div className="flex gap-6">
                      <img src={item.imageUrl || "/placeholder.png"} className="w-24 h-24 rounded-md object-cover" />

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="text-white text-lg font-semibold">{item.name}</h3>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        </div>

                        <div className="flex justify-between mt-3">
                          <div className="flex items-center border border-gray-600 rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="px-3 text-gray-300 hover:text-amber-400"
                            >
                              -
                            </button>
                            <span className="px-4 text-white">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="px-3 text-gray-300 hover:text-amber-400"
                            >
                              +
                            </button>
                          </div>

                          <p className="text-amber-400 font-bold text-xl">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-6">
                  <Link href="/products" className="border-2 border-amber-400 text-amber-400 px-6 py-3 rounded-lg hover:bg-amber-400 hover:text-black">
                    Continue Shopping
                  </Link>

                  <button onClick={clearCart} className="text-gray-400 hover:text-red-400">
                    Clear Cart
                  </button>
                </div>
              </>
            )}

          </div>

          {/* Order Summary */}
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
            <h2 className="text-2xl text-white font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between text-white text-xl font-bold">
                <span>Total</span>
                <span className="text-amber-400">₹{total.toFixed(2)}</span>
              </div>
            </div>

<Link href="/checkout">
  <button className="w-full mt-6 bg-amber-400 text-black py-3 rounded-lg font-bold hover:bg-amber-500">
    Proceed to Checkout
  </button>
</Link>
            {/* <button className="w-full mt-6 bg-amber-400 text-black py-3 rounded-lg font-bold hover:bg-amber-500">
              Proceed to Checkout
            </button> */}
          </div>

        </div>
      </div>
    </section>
  );
}
