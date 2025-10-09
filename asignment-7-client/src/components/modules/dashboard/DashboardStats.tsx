
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
        const res = await api.get("/dashboard"); // Adjust the API path as per your project
        setStats(res.data.data); 
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p><RippleLoader></RippleLoader></p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Total Users */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Total Users</h3>
          <p className="mt-2 text-xl">{stats.totalUsers}</p>
        </div>
        <FaUser className="text-white text-4xl" />
      </div>

      {/* Total Projects */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Total Projects</h3>
          <p className="mt-2 text-xl">{stats.totalProject}</p>
        </div>
        <FaProjectDiagram className="text-white text-4xl" />
      </div>

      {/* Total Blogs */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Total Blogs</h3>
          <p className="mt-2 text-xl">{stats.totalBlogs}</p>
        </div>
        <FaBlog className="text-white text-4xl" />
      </div>

      {/* Total Resumes */}
      <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Total Resumes</h3>
          <p className="mt-2 text-xl">{stats.totalResumes}</p>
        </div>
        {/* <GiResume className="text-white text-4xl" /> */}
      </div>

      {/* Total Blog Views */}
      <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Total Blog Views</h3>
          <p className="mt-2 text-xl">{stats.totalBlogViews}</p>
        </div>
        <FaEye className="text-white text-4xl" />
      </div>

      {/* Recent Blog */}
      <div className="col-span-1 sm:col-span-2 lg:col-span-3 bg-gradient-to-r from-teal-400 to-teal-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold">Recent Blog</h3>
        <ul className="mt-4 space-y-2">
          {stats.recentBlog.slice(0, 5).map((blog: any) => (
            <li key={blog.id} className="flex justify-between">
              <p className="text-lg">{blog.title}</p>
              <span className="text-sm">{new Date(blog.createAt).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
