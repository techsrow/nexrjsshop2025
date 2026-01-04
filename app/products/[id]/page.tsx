
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import toast from "react-hot-toast";
import SelectableButton from "@/components/SelectableButton";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFlavour, setSelectedFlavour] = useState<string | null>(null);

const [selected, setSelected] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await productService.getById(id as string);
          setProduct(res.data || res);
        } catch (error) {
          toast.error("Failed to load product");
        }
      })();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center text-gray-400 py-32 text-xl">
        Loading product details...
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, 1, {
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
    });
      toast.success("✅ Added to cart!", { duration: 2000 });
    } catch (error: any) {
      toast.error(error.message || "Failed to add to cart");
    }
  };

  // 🧾 NEW: Buy Now handler
  const handleBuyNow = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/buy-now`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1, // TODO: Replace with logged-in user ID from session/context
          productId: product.id,
          quantity,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Redirecting to checkout...");
        router.push(`/checkout/${data.order.id}`);
      } else {
        toast.error(data.error || "Failed to place order");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const total = (Number(product.price) * quantity).toFixed(2);

  return (
  <section className="bg-gray-900 pt-24 pb-16">
    {/* 🔹 Breadcrumb (No extra padding) */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 product-nav-details ">
      <nav className="flex items-center space-x-2 text-sm">
        <button className="text-gray-400 hover:text-amber-400 cursor-pointer">Home</button>
        <i className="ri-arrow-right-s-line text-gray-500"></i>

        <button className="text-gray-400 hover:text-amber-400 cursor-pointer">Shop</button>
        <i className="ri-arrow-right-s-line text-gray-500"></i>

        <span className="text-amber-400">{product.name}</span>
      </nav>
    </div>

    {/* 🔹 Product Details Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* LEFT - Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-800">
            <Image
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* RIGHT - Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-white">{product.name}</h1>

          <p className="text-amber-400 text-3xl font-bold">₹
            {Number(product.price).toFixed(2)}
          </p>

          <p className="text-gray-300 text-lg">{product.description}</p>

          {/* Flavours */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Flavours :</h3>

            <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
              
              <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
  {["Double Apple", "Mint", "Grape", "Vanilla", "Peach", "Strawberry", "Berlin Nights", "Havana", "Blue Melon",  "Magai salsa"].map((flavour) => (
    <button
      key={flavour}
      onClick={() => setSelectedFlavour(flavour)}
      className={`px-4 py-2 rounded-lg border transition-all cursor-pointer 
        whitespace-nowrap flex-shrink-0 
        ${
          selectedFlavour === flavour
            ? "bg-amber-400 text-black border-amber-400"            // ACTIVE
            : "border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400" // INACTIVE
        }
      `}
    >
      {flavour}
    </button>
  ))}
</div>

            </div>

           <SelectableButton
        label="Customized Flavours On Order"
        selected={selected}
        onSelect={() => setSelected(!selected)}
      />
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Quantity</h3>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-600 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-3 text-gray-300 hover:text-amber-400"
                >
                  <i className="ri-subtract-line"></i>
                </button>

                <span className="px-4 py-3 text-white font-medium">{quantity}</span>

                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-3 text-gray-300 hover:text-amber-400"
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>

              <span className="text-gray-400">Total: ₹{total}</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-500 
              text-black font-semibold px-8 py-4 rounded-xl hover:from-amber-500 hover:to-yellow-600"
            >
              <i className="ri-shopping-cart-line mr-2"></i> Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={loading}
              className="flex-1 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-200"
            >
              {loading ? "Processing..." : "Buy Now"}
            </button>
          </div>

        </div>
      </div>
    </div>
  </section>
);

}
