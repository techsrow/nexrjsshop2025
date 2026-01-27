/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PlumProductCard from "@/components/products/PlumProductCard";

export default function ProductsGrid({ items }: { items: any[] }) {
  if (!items?.length) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  // ✅ same spacing like Plum list
  return (


    
//     <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-3">
//       {items.map((p, idx) => (

        
//         <div key={String(p.id)} className="min-w-0 w-full">
//           {/* Mobile filter + sort buttons */}
// <div className="lg:hidden sticky top-0 z-20 bg-[#f5f6f8] py-3">
//   <div className="grid grid-cols-2 gap-3">
   
//   </div>
// </div>

//            <PlumProductCard key={String(p.id)} product={p} index={idx} />
//         </div>
       
//       ))}
//     </div>
<div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
    {items.map((p, idx) => (
      <div key={String(p.id)} className="min-w-0 w-full">
        <PlumProductCard key={String(p.id)} product={p} index={idx} />
      </div>
    ))}
  </div>
  );
}
