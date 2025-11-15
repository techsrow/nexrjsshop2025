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

    setJustLoggedIn(true);  // ✅ prevents "already logged in" toast right after login

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
    <div className="max-w-md mx-auto mt-24 bg-gray-900 p-6 shadow rounded">
      <h2 className="text-2xl font-bold text-white mb-6">Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="w-full p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-amber-500 text-black font-bold py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
