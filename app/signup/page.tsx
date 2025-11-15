/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const response = await res.json();

      if (!res.ok) {
        toast.error(response.message || "Signup failed");
        return;
      }

      // ✅ Show success toast
      toast.success("🎉 User registered successfully!");

      // ❗ Do NOT auto-login — go to login page instead
      setTimeout(() => {
        router.push("/login");
      }, 800);

    } catch (e) {
      toast.error("Signup error occurred");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md border border-gray-700">
        <h1 className="text-2xl font-bold text-amber-400 mb-4 text-center">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            {...register("firstName")}
            placeholder="First Name"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />

          <input
            {...register("lastName")}
            placeholder="Last Name"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            required
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3"
          />

          <button
            type="submit"
            className="w-full bg-amber-400 text-black rounded-lg py-3 font-semibold hover:bg-amber-500"
          >
            Create Account
          </button>
        </form>
      </div>
    </section>
  );
}
