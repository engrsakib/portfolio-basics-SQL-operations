"use client";

import { useState } from "react";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { useAuth } from "@/components/modules/auth/authHook/UseAuth";

export default function CreateBlogPage() {
  const { user, loading } = useAuth("ADMIN");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-xl text-[#612DDD] font-semibold animate-pulse">Loading user...</span>
      </div>
    );
  if (!user)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="text-lg text-red-500 font-semibold">Please login first!</span>
      </div>
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title,
        content,
        authorId: user.id,
      };

      const res = await api.post("/blog", payload, { withCredentials: true });

      Swal.fire({
        icon: "success",
        title: "✅ Blog Created!",
        text: res.data.message || "Your blog has been published successfully!",
        timer: 2100,
        showConfirmButton: false,
      });

      setTitle("");
      setContent("");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 sm:p-10 bg-white/90 dark:bg-[#181038]/90 rounded-3xl shadow-2xl border border-[#612DDD]/20 backdrop-blur-xl font-poppins relative overflow-hidden animate-fade-in-up">
      {/* Decorative Blur Circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#612DDD]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#38c7ff]/20 rounded-full blur-2xl -z-10" />

      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow-lg">
        📝 Create New Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-[#612DDD]/30 rounded-xl px-5 py-3 bg-white/80 dark:bg-[#23214e]/80 text-[#612DDD] dark:text-[#9F6BFF] font-bold focus:ring-2 focus:ring-[#612DDD] placeholder:text-[#612DDD]/50 dark:placeholder:text-[#9F6BFF]/50 transition"
          />
        </div>

        <div className="relative">
          <textarea
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            required
            className="w-full border border-[#612DDD]/30 rounded-xl px-5 py-3 bg-white/80 dark:bg-[#23214e]/80 text-[#612DDD] dark:text-[#9F6BFF] font-medium focus:ring-2 focus:ring-[#612DDD] placeholder:text-[#612DDD]/50 dark:placeholder:text-[#9F6BFF]/50 transition resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#612DDD]/30"
        >
          {saving ? "Publishing..." : "Publish Blog"}
        </button>
      </form>

      {/* Fade-in Animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(28px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s cubic-bezier(.41,.99,.54,.98) both;
        }
      `}</style>
    </div>
  );
}