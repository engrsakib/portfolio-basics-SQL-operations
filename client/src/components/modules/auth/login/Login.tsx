"use client";

import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form, {
        withCredentials: true,
      });

      toast.success("Login successful!");
      router.push("/");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#612DDD] via-[#7F53AC] to-[#cbb4ff] font-poppins relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#612DDD]/30 rounded-full blur-2xl z-0"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#cbb4ff]/40 rounded-full blur-2xl z-0"></div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl shadow-[0_8px_40px_0_rgba(97,45,221,0.10)] border border-[#e5e4fa] w-full max-w-md z-10"
      >
        <div className="flex flex-col items-center mb-8">
          {/* Optional avatar or icon */}
          <div className="bg-[#612DDD]/10 rounded-full p-2 mb-3">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#612DDD">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/>
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-[#612DDD] mb-2 drop-shadow text-center">Login</h2>
          <p className="text-[#7F53AC] text-base mb-1 text-center">Welcome back! Please login to your account.</p>
        </div>
        <div className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-[#cbb4ff] bg-[#f7f6ff] text-[#612DDD] placeholder-[#a68afc] shadow focus:outline-none focus:ring-2 focus:ring-[#612DDD] focus:bg-white transition"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-[#cbb4ff] bg-[#f7f6ff] text-[#612DDD] placeholder-[#a68afc] shadow focus:outline-none focus:ring-2 focus:ring-[#612DDD] focus:bg-white transition"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded-xl mt-7 text-white font-semibold bg-[#612DDD] hover:bg-[#4a1fa6] transition-all duration-300 shadow-lg hover:scale-[1.03] active:scale-[0.98]"
        >
          Login
        </button>
        <div className="mt-7 text-center text-[#7F53AC] text-base">
          <p>
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-[#612DDD] font-semibold hover:underline hover:text-[#4a1fa6] transition"
            >
              Register
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}