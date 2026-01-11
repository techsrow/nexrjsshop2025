"use client";

import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We’re here to help. Reach out to Crescent Healthcare for product support,
            inquiries, or assistance anytime.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Get in Touch
            </h2>

            <div className="space-y-5 text-gray-700">
              <div className="flex items-start gap-4">
                <FiMail className="text-[#b3008f] text-xl mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm">support@crescenthealthcare.in</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiPhone className="text-[#b3008f] text-xl mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-sm">022-25007768</p>
                  <p className="text-xs text-gray-500">Mon – Sat, 10 AM – 6 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <FiMapPin className="text-[#b3008f] text-xl mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm">
                    D-201, Ghatkopar Industrial Estate, Off L.B.S Marg,<br /> Ghatkopar(West), Mumbai 400086 
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b3008f]/40"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b3008f]/40"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b3008f]/40"
              />

              <textarea
                rows={4}
                placeholder="Your Message"
                className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#b3008f]/40"
              />

              <button
                type="submit"
                className="w-full bg-[#b3008f] hover:bg-[#990077] text-white py-2 rounded-md font-semibold transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-10">
          We aim to respond to all queries within 24–48 business hours.
        </p>
      </div>
    </div>
  );
}
