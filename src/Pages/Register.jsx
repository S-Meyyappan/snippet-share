import { useState } from "react"
import axios from "axios"
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";

function Register() {

  const navigate = useNavigate();

  const path = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${path}/register`, formData);
      localStorage.setItem("Token", res.data);
      alert("Registered Successfully!");
      navigate("/Add")
    } catch (err) {
      alert("Registration Failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-white/10 bg-white/10 dark:bg-black/40 backdrop-blur-md p-8 sm:p-12 space-y-6 shadow-xl"
      >
        <h1 className="text-2xl font-bold text-white">Register</h1>

        {/* Name */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-200">Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your name"
            className="rounded-md bg-[#1f2937] dark:bg-[#111827] px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a36af]"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-200">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="rounded-md bg-[#1f2937] dark:bg-[#111827] px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a36af]"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-medium text-gray-200">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            className="rounded-md bg-[#1f2937] dark:bg-[#111827] px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0a36af]"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-gradient-to-r from-sky-600 to-sky-700 px-6 py-2 font-semibold text-white shadow-md transition hover:from-sky-500 hover:to-sky-400 focus:outline-none focus:ring-2 focus:ring-[#dde0e8]"
        >
          Register
        </button>

        {/* Register Link */}
        <p className="text-sm text-gray-300 text-center">
          Exising user?{" "}
          <NavLink
                to="/login"
                className="text-sky-400 hover:text-sky-300 font-medium"
          >
            Click here to Login
          </NavLink>
        </p>
      </form>
    </div>
    </>
  );
}

export default Register;
