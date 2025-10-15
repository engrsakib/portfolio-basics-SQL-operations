"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { FaUser, FaProjectDiagram, FaBlog, FaEye } from "react-icons/fa";
import RippleLoader from "@/components/laoding/RippleLoader";

export default function DashboardStats() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data.data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p><RippleLoader /></p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Total Users */}
      <div className="bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white p-6 rounded-xl shadow-2xl flex items-center justify-between hover:scale-[1.03] hover:shadow-purple-glow transition-all duration-300">
        <div>
          <h3 className="text-2xl font-bold">Total Users</h3>
          <p className="mt-2 text-xl">{stats.totalUsers}</p>
        </div>
        <FaUser className="text-white text-4xl drop-shadow-xl" />
      </div>

      {/* Total Projects */}
      <div className="bg-gradient-to-r from-[#38c7ff] to-[#612DDD] text-white p-6 rounded-xl shadow-2xl flex items-center justify-between hover:scale-[1.03] hover:shadow-purple-glow transition-all duration-300">
        <div>
          <h3 className="text-2xl font-bold">Total Projects</h3>
          <p className="mt-2 text-xl">{stats.totalProject}</p>
        </div>
        <FaProjectDiagram className="text-white text-4xl drop-shadow-xl" />
      </div>

      {/* Total Blogs */}
      <div className="bg-gradient-to-r from-[#ff6fd8] to-[#612DDD] text-white p-6 rounded-xl shadow-2xl flex items-center justify-between hover:scale-[1.03] hover:shadow-purple-glow transition-all duration-300">
        <div>
          <h3 className="text-2xl font-bold">Total Blogs</h3>
          <p className="mt-2 text-xl">{stats.totalBlogs}</p>
        </div>
        <FaBlog className="text-white text-4xl drop-shadow-xl" />
      </div>

      {/* Total Resumes */}
      <div className="bg-gradient-to-r from-[#9F6BFF] to-[#612DDD] text-white p-6 rounded-xl shadow-2xl flex items-center justify-between hover:scale-[1.03] hover:shadow-purple-glow transition-all duration-300">
        <div>
          <h3 className="text-2xl font-bold">Total Resumes</h3>
          <p className="mt-2 text-xl">{stats.totalResumes}</p>
        </div>
        {/* <GiResume className="text-white text-4xl" /> */}
      </div>

      {/* Total Blog Views */}
      <div className="bg-gradient-to-r from-[#612DDD] to-[#ff6fd8] text-white p-6 rounded-xl shadow-2xl flex items-center justify-between hover:scale-[1.03] hover:shadow-purple-glow transition-all duration-300">
        <div>
          <h3 className="text-2xl font-bold">Total Blog Views</h3>
          <p className="mt-2 text-xl">{stats.totalBlogViews}</p>
        </div>
        <FaEye className="text-white text-4xl drop-shadow-xl" />
      </div>

      {/* Recent Blog */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-[#38c7ff] via-[#612DDD] to-[#ff6fd8] text-white p-6 rounded-xl shadow-2xl hover:scale-[1.01] hover:shadow-purple-glow transition-all duration-300">
        <h3 className="text-2xl font-bold">Recent Blog</h3>
        <ul className="mt-4 space-y-2">
          {stats.recentBlog?.slice(0, 5).map((blog: any) => (
            <li key={blog.id} className="flex justify-between items-center">
              <p className="text-lg font-semibold">{blog.title}</p>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{new Date(blog.createAt).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Glow Style */}
      <style jsx>{`
        .shadow-purple-glow {
          box-shadow: 0 0 24px 0 #612DDD99 !important;
        }
      `}</style>
    </div>
  );
}