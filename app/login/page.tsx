/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername } = useAuth();
  const { refreshCartCount } = useCart();
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password }, false);

      // ✅ Your backend returns: { success, data: { token, email }, message }
      const token = res.data.data.token;
      const userEmail = res.data.data.email;

      localStorage.setItem("token", token);
      localStorage.setItem("username", userEmail);

      setUsername(userEmail);

      await refreshCartCount();

      router.push("/");
    } catch (err: any) {
      alert(err.message || "Login failed");
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
