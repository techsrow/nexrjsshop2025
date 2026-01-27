/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { loginUser, resendVerification } from "@/lib/auth";
import { setToken, setStoredUsername } from "@/lib/storage";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function extractErrorMessage(e: any, fallback: string) {
  if (e?.message && typeof e.message === "string") return e.message;
  if (typeof e === "string") return e;
  if (e?.details?.message) return e.details.message;
  return fallback;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [showResend, setShowResend] = useState(false);

  const normalizedEmail = useMemo(() => email.trim().toLowerCase(), [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setErr(null);
    setMsg(null);
    setShowResend(false);

    if (!normalizedEmail) return setErr("Email is required.");
    if (!isEmail(normalizedEmail)) return setErr("Enter a valid email.");
    if (!password) return setErr("Password is required.");

    setLoading(true);
    try {
      const res = await loginUser({ email: normalizedEmail, password });

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Login failed");
      }

      const token = res?.data?.data?.token;
      const user = res?.data?.data?.user;

      if (!token) throw new Error("Missing token from server");

      setToken(token);
      setStoredUsername(user?.firstName || user?.email || "User");

      window.location.href = "/account";
    } catch (e: any) {
      const m = extractErrorMessage(e, "Login failed");
      setErr(m);

      if (m.toLowerCase().includes("verify your email")) {
        setShowResend(true);
      }
    } finally {
      setLoading(false);
    }
  }

  async function onResend() {
    setErr(null);
    setMsg(null);

    if (!normalizedEmail || !isEmail(normalizedEmail)) {
      setErr("Enter a valid email first, then resend verification.");
      return;
    }

    setLoading(true);
    try {
      const res = await resendVerification(normalizedEmail);

      if (!res?.data?.success) {
        throw new Error(res?.data?.message || "Failed to resend");
      }

      setMsg(res.data.message || "Verification email sent.");
    } catch (e: any) {
      setErr(extractErrorMessage(e, "Failed to resend"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold">Login</h1>

      <form onSubmit={onSubmit} className="mt-6 space-y-3">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
        />

        <input
          className="border rounded px-3 py-2 w-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        {err && <div className="text-sm text-red-600">{err}</div>}
        {msg && <div className="text-sm text-green-700">{msg}</div>}

        <button disabled={loading} className="w-full rounded bg-black text-white py-2 disabled:opacity-60">
          {loading ? "Please wait..." : "Login"}
        </button>

        <p className="text-sm text-gray-600">
          <Link className="underline" href="/forgot-password">
            Forgot password?
          </Link>
        </p>

        {showResend && (
          <button type="button" disabled={loading} onClick={onResend} className="w-full rounded border py-2 disabled:opacity-60">
            Resend verification email
          </button>
        )}

        <p className="text-sm text-gray-600">
          New user? <Link className="underline" href="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
}
