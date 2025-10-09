


"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form, {
        withCredentials: true,
      });

      toast.success("Login successful!");
      router.push("/");
      console.log(res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        <div className="mt-4 text-center text-gray-600">
          <p>
            Don't have an account?{" "}
            <a href="/auth/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
