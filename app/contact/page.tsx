"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    email: "",
    location: "",
    message: "",
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => {
  setForm({ ...form, [e.target.name]: e.target.value });
};


const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

    const phoneNumber = "917738258525"; // ✅ replace with your WhatsApp number
    const text = `New Inquiry From Website:
    Name: ${form.name}
    WhatsApp: ${form.whatsapp}
    Email: ${form.email}
    Location: ${form.location}
    Message: ${form.message}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");
  };

  return (
    <section className="min-h-screen bg-gray-900 py-16 py-40">
      <div className="max-w-3xl mx-auto bg-gray-800 p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-amber-400 text-center mb-8">
          Contact Us
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-amber-400 outline-none"
            required
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp Number"
            value={form.whatsapp}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-amber-400 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-amber-400 outline-none"
          />

          <textarea
            name="message"
            rows={4}
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-amber-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-amber-400 text-black font-bold py-3 rounded-lg hover:bg-amber-500 transition"
          >
            Send on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
