/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoggedIn } = useAuth();
  const { refreshCartCount } = useCart();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  useEffect(() => {
    if (isLoggedIn && !justLoggedIn) {
      toast.error("You are already logged in!");
      router.replace("/");
    }
  }, [isLoggedIn, justLoggedIn]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      const token = res.data.data.token;
      const userEmail = res.data.data.user.email;

      login(userEmail, token);
      setJustLoggedIn(true);

      if (typeof refreshCartCount === "function") {
        await refreshCartCount();
      }

      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* TITLE */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to continue shopping
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-[#b3008f]/30 focus:border-[#b3008f]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900
                         focus:outline-none focus:ring-2 focus:ring-[#b3008f]/30 focus:border-[#b3008f]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-[#b3008f] hover:bg-[#990077] text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* FOOTER LINKS */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/signup")}
            className="text-[#b3008f] font-medium cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
