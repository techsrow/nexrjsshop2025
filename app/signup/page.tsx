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

      toast.success("🎉 Account created successfully!");

      setTimeout(() => {
        router.push("/login");
      }, 800);
    } catch {
      toast.error("Signup error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* HEADER */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Create Account ✨
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join us and start shopping
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* FIRST NAME */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              First Name
            </label>
            <input
              {...register("firstName")}
              placeholder="Enter first name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#b3008f]/30 focus:border-[#b3008f]"
            />
          </div>

          {/* LAST NAME */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Last Name
            </label>
            <input
              {...register("lastName")}
              placeholder="Enter last name"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#b3008f]/30 focus:border-[#b3008f]"
            />
          </div>

          {/* EMAIL */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#b3008f]/30 focus:border-[#b3008f]"
            />
          </div>

          {/* PASSWORD */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="Create a password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#b3008f]/30 focus:border-[#b3008f]"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full bg-[#b3008f] hover:bg-[#990077] text-white py-3 rounded-lg font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* FOOTER */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-[#b3008f] font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
