/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useEffect, useState, ReactNode } from "react";

interface AgeGateProps {
  children: ReactNode;
}

export default function AgeGate({ children }: AgeGateProps) {
  const [verified, setVerified] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [age, setAge] = useState("");

  useEffect(() => {
    const status = localStorage.getItem("ageStatus");
    if (status === "verified") setVerified(true);
    if (status === "blocked") setBlocked(true);
  }, []);

  const handleSubmit = () => {
    const userAge = parseInt(age);
    if (userAge >= 18) {
      localStorage.setItem("ageStatus", "verified");
      setVerified(true);
    } else {
      localStorage.setItem("ageStatus", "blocked");
      setBlocked(true);
    }
  };

  // 🔵 Under 18 Screen
  if (blocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-blue-600 to-cyan-500 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Restricted 🚫</h1>
          <p className="text-lg opacity-90">
            You must be 18+ to enter this website.
          </p>
        </div>
      </div>
    );
  }

  // 🌈 Age Verification Popup
  if (!verified) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

        <div className="bg-gradient-to-br from-black via-gray-900 to-purple-900 p-8 rounded-2xl shadow-2xl w-[90%] max-w-md text-center text-white border border-white/10">

          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Age Verification
          </h2>

          <p className="text-gray-300 mb-6">
            Please confirm your age to continue
          </p>

          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 mb-5"
          />

          <button
            onClick={handleSubmit}
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg"
          >
            Enter Site
          </button>

        </div>
      </div>
    );
  }

  return <>{children}</>;
}
