"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function FloatingContactButtons() {
  const phoneNumber = "919999999999";     // replace
  const whatsappNumber = "919999999999";  // replace

  const baseClass =
    "w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg hover:shadow-xl transition-transform duration-200 hover:-translate-y-0.5";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className={baseClass}
      >
        <FaWhatsapp size={30} className="text-green-500" />
      </a>

      {/* Call */}
      <a
        href={`tel:+${phoneNumber}`}
        aria-label="Call Now"
        className={baseClass}
      >
        <FaPhoneAlt size={22} className="text-[#b3008f]" />
      </a>
    </div>
  );
}
