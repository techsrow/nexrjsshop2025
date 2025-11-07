"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { productService } from "@/services/productService";
import cartService from "@/services/cartService";

export default function ProductDetails() {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) productService.getById(id as string).then(setProduct);
  }, [id]);

  const addToCart = async () => {
    await cartService.addToCart(product.id, quantity);
    alert("Product added to cart!");
  };

  if (!product) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 flex flex-col md:flex-row gap-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-1/3 h-96 object-cover rounded-lg"
      />

      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-2xl font-semibold text-black mb-4">
          ₹{product.discountPrice || product.price}
          {product.discountPrice && (
            <span className="text-gray-400 line-through ml-2">
              ₹{product.price}
            </span>
          )}
        </p>

        <div className="flex items-center gap-3 mb-4">
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded p-2 w-20"
          />
        </div>

        <button
          onClick={addToCart}
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
