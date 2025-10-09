

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/lib/api";

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth", form);
      toast.success("Registration successful! Please login.");
      router.push("/login");
      console.log(form);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>
        
        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        
        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        
        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg mt-4 hover:bg-indigo-700 transition duration-300"
        >
          Register
        </button>
        
        {/* Login Link */}
        <div className="mt-4 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:underline">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
}
