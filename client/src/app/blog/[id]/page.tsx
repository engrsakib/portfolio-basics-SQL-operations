"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { CalendarDays, Eye } from "lucide-react";
import RippleLoader from "@/components/laoding/RippleLoader";

interface Blog {
  id: number;
  title: string;
  content: string;
  views: number;
  createAt: string;
  updateAt: string;
  author: {
    name: string;
    email: string;
  };
}

export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/blog/${id}`, { withCredentials: true });
        setBlog(res.data.data);
      } catch (error) {
        console.error("Failed to load blog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e]">
        <RippleLoader text="Loading Blog..." />
      </div>
    );

  if (!blog)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e]">
        <p className="text-center mt-10 text-[#612DDD] dark:text-[#9F6BFF] font-bold text-xl">
          No blog found 😔
        </p>
      </div>
    );

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] py-14 px-3 sm:px-8 flex items-center justify-center font-poppins relative overflow-hidden">
      {/* Decorative Blurs & Glow */}
      <div className="absolute -top-32 -left-32 w-[320px] h-[320px] bg-[#612DDD]/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#38c7ff]/30 rounded-full blur-2xl -z-10" />

      <div className="max-w-3xl w-full mx-auto bg-white/90 dark:bg-[#181038]/80 rounded-3xl shadow-2xl border border-[#612DDD]/20 overflow-hidden backdrop-blur-xl animate-fade-in-up relative">
        {/* Card Glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-60 transition-all duration-300"
          style={{
            background: "radial-gradient(ellipse at 60% 20%, #612DDD66 20%, transparent 75%)",
            filter: "blur(16px)",
          }}
        />

        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow">
            {blog.title}
          </h1>
          <div className="flex gap-8 text-[#612DDD] dark:text-[#9F6BFF] text-sm font-bold mb-6">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />{" "}
              {new Date(blog.createAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-2">
              <Eye size={16} /> {blog.views} views
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line text-lg mb-8">
            {blog.content}
          </p>

          {/* Author Info */}
          <div className="mt-8 flex items-center gap-3 bg-gradient-to-r from-[#612DDD] to-[#38c7ff] rounded-xl px-5 py-3 text-white text-sm font-bold shadow-md">
            <span className="flex items-center gap-2">
              ✍️ {blog.author.name}
            </span>
            <span className="truncate">| {blog.author.email}</span>
          </div>
        </div>
      </div>

      {/* Animation & Glow Style */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.41,.99,.54,.98) both;
        }
      `}</style>
    </section>
  );
}