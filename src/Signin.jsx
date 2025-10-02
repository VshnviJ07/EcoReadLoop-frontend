import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";

export default function SignIn() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async e => {
    e.preventDefault(); setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({identifier,password})});
      const data = await res.json();
      if(!data.success){ setError(data.message); return; }
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch { setError("Server error"); }
  };

  return (
    <AuthWrapper>
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Sign In</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSignIn} className="space-y-4">
        <input type="text" placeholder="Email or Mobile" value={identifier} onChange={e=>setIdentifier(e.target.value)} className="w-full border p-3 rounded"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border p-3 rounded"/>
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">Sign In</button>
      </form>
      <div className="flex justify-between mt-4 text-sm text-white">
        <Link to="/signup" className="text-blue-300 hover:underline">Sign Up</Link>
        <Link to="/forgot-password" className="text-blue-300 hover:underline">Forgot Password?</Link>
      </div>
    </AuthWrapper>
  );
}
