"use client";
import { useEffect, useState } from "react";
import cartService from "@/services/cartService";

export default function CartPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [cart, setCart] = useState<any[]>([]);

  const loadCart = async () => {
    const items = await cartService.getCart();
    setCart(items);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadCart();
  }, []);

  const removeItem = async (id: number) => {
    await cartService.removeFromCart(id);
    loadCart();
  };

  const clearCart = async () => {
    await cartService.clearCart();
    loadCart();
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (item.price ? item.price : 0) * (item.quantity || 1),
    0
  );

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in your cart</p>
      ) : (
        <div>
          {cart.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b py-3"
            >
              <div>
                <h2 className="font-semibold">{item.name || `Product ${item.productId}`}</h2>
                <p>Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ₹{total}</h2>
            <button
              onClick={clearCart}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
