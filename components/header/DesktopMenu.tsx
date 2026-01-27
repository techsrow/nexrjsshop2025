// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import { useCatalogMenu } from "./CatalogMenuProvider";

// export default function DesktopMenu() {
//   const { menu, loading } = useCatalogMenu();

//   if (loading) {
//     return (
//       <nav className="bg-white border-t">
//         <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-gray-500">
//           Loading menu...
//         </div>
//       </nav>
//     );
//   }

//   if (!menu || menu.length === 0) {
//     return (
//       <nav className="bg-white border-t">
//         <div className="mx-auto max-w-7xl px-6 py-3 text-sm text-gray-600">
//           Menu data not found in provider (check API / provider logs).
//         </div>
//       </nav>
//     );
//   }

//   return (
//     <nav className="bg-white border-t relative z-[999]">
//       <div className="mx-auto max-w-7xl px-6">
//         <ul className="flex items-center gap-6 py-3">
//           {menu.map((item) => (
//             <li key={item.href || item.label} className="relative group">
//               <Link href={item.href || "/products"} className="text-sm font-medium hover:opacity-80">
//                 {item.label}
//               </Link>

//               {!!item.children?.length && (
//                 <div className="absolute left-0 top-full hidden group-hover:block pt-3">
//                   <div className="min-w-[260px] rounded-xl border bg-white shadow-lg p-3">
//                     <div className="grid gap-2">
//                       {item.children.map((c) => (
//                         <Link
//                           key={c.href}
//                           href={c.href}
//                           className="text-sm px-3 py-2 rounded-lg hover:bg-gray-50"
//                         >
//                           {c.label}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import { useCatalogMenu } from "./CatalogMenuProvider";

export default function DesktopMenu() {
  const { menu } = useCatalogMenu();

  return (
    <nav className="border-t">
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex items-center gap-6 text-[16px] text-brand py-3">
          {menu.map((cat) => {
            const hasChildren = !!cat.children?.length;

            return (
              <li
                key={cat.label}
                className="relative group"
              >
                {/* Top level */}
                <Link
                  href={cat.href || "#"}
                  className="flex items-center gap-1 pb-2 hover:opacity-90"
                  style={{ color: "#000" }}
                >
                  <span className="capitalize">{cat.label}</span>
                  {hasChildren && <FiChevronDown className="text-sm mt-[1px]" />}
                </Link>

                {/* Hover bridge (prevents flicker) */}
                {hasChildren && (
                  <div className="absolute left-0 top-full h-2 w-full" />
                )}

                {/* Dropdown */}
                {hasChildren && (
                  <div
                    className="
                      absolute left-0 top-[100%]
                      hidden group-hover:block
                      w-[260px]
                      bg-white
                      shadow-lg
                      
                      z-50
                    "
                  >
                    <div className="py-2">
                      {cat.children!.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="
                            block px-4 py-2.5
                            text-sm text-gray-800
                            hover:bg-gray-100
                          "
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
