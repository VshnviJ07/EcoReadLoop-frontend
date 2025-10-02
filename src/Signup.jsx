import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";

export default function Signup() {
  const [fullName,setFullName]=useState("");
  const [identifier,setIdentifier]=useState("");
  const [password,setPassword]=useState("");
  const [showOtp,setShowOtp]=useState(false);
  const [userId,setUserId]=useState("");
  const [otp,setOtp]=useState("");
  const [error,setError]=useState("");
  const navigate=useNavigate();

  const handleSignUp=async e=>{
    e.preventDefault(); setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({fullName,identifier,password})});
      const data = await res.json();
      if(!data.success){ setError(data.message); return; }
      setUserId(data.userId); setShowOtp(true);
    } catch { setError("Server error"); }
  };

  const handleVerifyOtp=async e=>{
    e.preventDefault(); setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-signup-otp",{method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({userId,otp})});
      const data = await res.json();
      if(!data.success){ setError(data.message); return; }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch { setError("Server error"); }
  };

  if(showOtp) return (
    <AuthWrapper>
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Verify OTP</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleVerifyOtp}>
        <input type="text" placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} className="w-full border p-3 rounded"/>
        <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded hover:bg-purple-700 mt-3">Verify OTP</button>
      </form>
    </AuthWrapper>
  );

  return (
    <AuthWrapper>
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign Up</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSignUp}>
        <input type="text" placeholder="Full Name" value={fullName} onChange={e=>setFullName(e.target.value)} className="w-full border p-3 rounded mb-3"/>
        <input type="text" placeholder="Email or Mobile" value={identifier} onChange={e=>setIdentifier(e.target.value)} className="w-full border p-3 rounded mb-3"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-3 rounded mb-3"/>
        <button type="submit" className="w-full bg-green-600 text-white p-3 rounded hover:bg-green-700">Sign Up</button>
      </form>
    </AuthWrapper>
  );
}
