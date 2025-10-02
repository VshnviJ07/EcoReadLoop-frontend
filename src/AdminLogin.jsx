import React, { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1=send OTP, 2=verify OTP

  const sendOtp = async () => {
    try {
      await axios.post("/api/admin/send-otp", { email });
      setStep(2);
      alert("OTP sent to your email & mobile");
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post("/api/admin/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      alert("OTP verified! Logged in successfully");
      window.location.href = "/admin-dashboard";
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-10 bg-gray-100 rounded shadow">
      {step === 1 ? (
        <>
          <h2 className="text-xl font-bold mb-4">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border mb-4 w-full"
          />
          <button onClick={sendOtp} className="bg-blue-500 text-white px-4 py-2 rounded">
            Send OTP
          </button>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="p-2 border mb-4 w-full"
          />
          <button onClick={verifyOtp} className="bg-green-500 text-white px-4 py-2 rounded">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
