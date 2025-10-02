// AuthWrapper.jsx
import React from "react";
import BackgroundVideo from "./BackgroundVideo";

export default function AuthWrapper({ children }) {
  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 🎥 Background Video */}
      <BackgroundVideo />

      {/* 🔹 Dark transparent overlay (no blur) */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* 📌 Glass Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
        {children}
      </div>
    </div>
  );
}