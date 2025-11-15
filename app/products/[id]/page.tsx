// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { productService } from "@/services/productService";
// import { useCart } from "@/context/CartContext";
// import Image from "next/image";

// export default function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<any>(null);
//   const [selectedEdition, setSelectedEdition] = useState("Platinum Edition");
//   const [quantity, setQuantity] = useState(1);
//   const [added, setAdded] = useState(false);

//   const { addToCart } = useCart(); // ✅ from CartContext

//   // ✅ Fetch product by ID
//   useEffect(() => {
//     if (id) {
//       productService.getById(id as string).then(setProduct);
//     }
//   }, [id]);

//   if (!product) {
//     return (
//       <div className="text-center text-gray-400 py-32 text-xl">
//         Loading product details...
//       </div>
//     );
//   }

//   // ✅ Handle quantity update
//   const handleQuantityChange = (change: number) => {
//     setQuantity((prev) => Math.max(1, prev + change));
//   };

//   // ✅ Handle add to cart
//   const handleAddToCart = async () => {
//     await addToCart(product, quantity); // Uses context logic (API/local)
//     setAdded(true);

//     // Hide success message after few seconds
//     setTimeout(() => setAdded(false), 3000);
//   };

//   const total = (product.price * quantity).toFixed(2);

//   return (
//     <section className="py-16 bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left - Product Images */}
//           <div className="space-y-4">
//             <div className="aspect-square rounded-2xl overflow-hidden bg-gray-800">
//               <Image
//                 src={product.imageUrl || "/placeholder.png"}
//                 alt={product.name}
//                 width={600}
//                 height={600}
//                 className="w-full h-full object-cover object-top"
//               />
//             </div>

//             <div className="grid grid-cols-4 gap-4">
//               {[1, 2, 3, 4].map((i) => (
//                 <button
//                   key={i}
//                   className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors cursor-pointer ${
//                     i === 1
//                       ? "border-amber-400"
//                       : "border-gray-700 hover:border-gray-600"
//                   }`}
//                 >
//                   <Image
//                     src={product.imageUrl || "/placeholder.png"}
//                     alt={`${product.name} view ${i}`}
//                     width={600}
//                     height={600}
//                     className="w-full h-full object-cover object-top"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Right - Product Info */}
//           <div className="space-y-6">
//             <div>
//               <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>
//               <div className="flex items-center mb-4">
//                 <div className="flex text-amber-400 mr-3">
//                   <i className="ri-star-fill"></i>
//                   <i className="ri-star-fill"></i>
//                   <i className="ri-star-fill"></i>
//                   <i className="ri-star-fill"></i>
//                   <i className="ri-star-line"></i>
//                 </div>
//                 <span className="text-gray-400">(124 reviews)</span>
//               </div>
//               <div className="flex items-center gap-4 mb-6">
//                 <span className="text-3xl font-bold text-amber-400">
//                   ${product.price.toFixed(2)}
//                 </span>
//                 <span className="text-green-400 text-sm font-medium">
//                   <i className="ri-check-line mr-1"></i>In Stock (15 available)
//                 </span>
//               </div>
//             </div>

//             <p className="text-gray-300 text-lg leading-relaxed">
//               Experience the ultimate in luxury smoking with our Premium Glass Hookah.
//               Crafted from the finest borosilicate glass and featuring an ornate metal
//               stem, this hookah delivers exceptional performance and stunning visual
//               appeal.
//             </p>

//             {/* Edition Selector */}
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-3">Edition</h3>
//               <div className="flex gap-3 flex-wrap">
//                 {[
//                   "Standard - $299.99",
//                   "Gold Edition - $399.99",
//                   "Platinum Edition - $499.99",
//                 ].map((edition) => (
//                   <button
//                     key={edition}
//                     onClick={() => setSelectedEdition(edition)}
//                     className={`px-4 py-2 rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
//                       selectedEdition === edition
//                         ? "border-amber-400 bg-amber-400/10 text-amber-400"
//                         : "border-gray-600 text-gray-300 hover:border-gray-500"
//                     }`}
//                   >
//                     {edition}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Quantity Selector */}
//             <div>
//               <h3 className="text-lg font-semibold text-white mb-3">Quantity</h3>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center border border-gray-600 rounded-lg">
//                   <button
//                     onClick={() => handleQuantityChange(-1)}
//                     className="p-3 text-gray-300 hover:text-amber-400 transition-colors cursor-pointer"
//                   >
//                     <i className="ri-subtract-line"></i>
//                   </button>
//                   <span className="px-4 py-3 text-white font-medium min-w-[60px] text-center">
//                     {quantity}
//                   </span>
//                   <button
//                     onClick={() => handleQuantityChange(1)}
//                     className="p-3 text-gray-300 hover:text-amber-400 transition-colors cursor-pointer"
//                   >
//                     <i className="ri-add-line"></i>
//                   </button>
//                 </div>
//                 <span className="text-gray-400">Total: ${total}</span>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4">
//               <button
//                 onClick={handleAddToCart}
//                 className="font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap bg-gradient-to-r from-amber-400 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-600 shadow-lg hover:shadow-xl px-8 py-4 text-lg rounded-xl flex-1 flex items-center justify-center"
//               >
//                 <i className="ri-shopping-cart-line mr-2"></i>
//                 Add to Cart
//               </button>
//               <button className="w-12 h-12 flex items-center justify-center border border-gray-600 rounded-lg text-gray-300 hover:text-amber-400 hover:border-amber-400 transition-colors cursor-pointer">
//                 <i className="ri-heart-line"></i>
//               </button>
//             </div>

//             {/* Success Message */}
//             {added && (
//               <div className="mt-4 bg-green-800/30 border border-green-600 text-green-300 px-6 py-3 rounded-lg flex items-center justify-between">
//                 <span>
//                   <i className="ri-check-line mr-2"></i>Added to cart successfully!
//                 </span>
//                 <a href="/cart" className="text-green-400 underline hover:text-green-300">
//                   View Cart
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productService } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedFlavour, setSelectedFlavour] = useState(null);


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
              {/* {["Double Apple", "Mint", "Grape", "Vanilla", "Peach", "Strawberry", "Blueberry"].map((flavour) => (
                <button
                  key={flavour}
                  className="px-4 py-2 rounded-lg border transition-colors cursor-pointer 
                  border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 
                  whitespace-nowrap flex-shrink-0"
                >
                  {flavour}
                </button>
              ))} */}
              <div className="flex gap-3 overflow-x-auto scrollbar-hide py-2">
  {["Double Apple", "Mint", "Grape", "Vanilla", "Peach", "Strawberry", "Blueberry"].map((flavour) => (
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
