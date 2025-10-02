import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "./api";
import PageWrapper from "./PageWrapper";

export default function Profile() {
  const [form, setForm] = useState({ fullName:"", email:"", mobile:"", alternateMobile:"", age:"", dob:"", address:"", city:"", state:"", pincode:"", gender:"" });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/signin"); return; }

    API.get("/auth/profile").then(res=>{
      if(res.data.success) setForm({...res.data.user, dob:res.data.user.dob?res.data.user.dob.split("T")[0]:""});
    }).catch(err=>{
      setIsError(true); setMessage("Error fetching profile ❌");
    });
  }, [navigate]);

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.patch("/auth/profile", form);
      if(res.data.success) {
        setIsError(false); setMessage(res.data.message);
      }
    } catch { setIsError(true); setMessage("Error updating profile ❌"); }
  };

  return (
    <PageWrapper title="Profile">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-2 gap-4">
          <input name="fullName" value={form.fullName} onChange={handleChange} className="p-2 border rounded"/>
          <input name="email" value={form.email} onChange={handleChange} className="p-2 border rounded"/>
          <input name="mobile" value={form.mobile} onChange={handleChange} className="p-2 border rounded"/>
          <input name="alternateMobile" value={form.alternateMobile} onChange={handleChange} className="p-2 border rounded"/>
          <input type="number" name="age" value={form.age} onChange={handleChange} className="p-2 border rounded"/>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} className="p-2 border rounded"/>
          <input name="city" value={form.city} onChange={handleChange} className="p-2 border rounded"/>
          <input name="state" value={form.state} onChange={handleChange} className="p-2 border rounded"/>
          <input name="pincode" value={form.pincode} onChange={handleChange} className="p-2 border rounded"/>
        </div>
        <textarea name="address" value={form.address} onChange={handleChange} className="w-full p-2 mt-3 border rounded" rows="3"/>
        <select name="gender" value={form.gender} onChange={handleChange} className="w-full p-2 mt-3 border rounded">
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" className="w-full mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Save</button>
        {message && <p className={`mt-4 text-center ${isError?"text-red-500":"text-green-500"}`}>{message}</p>}
      </form>
    </PageWrapper>
  );
}
