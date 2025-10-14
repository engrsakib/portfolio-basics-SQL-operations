"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import {
  CalendarDays,
  Eye,
  User,
  ChevronLeft,
  ChevronRight,
  SortAsc,
  SortDesc,
  CalendarRange,
} from "lucide-react";
import { IoFilterCircleSharp } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";
import Link from "next/link";
import RippleLoader from "@/components/laoding/RippleLoader";

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  views: number;
  createAt: string;
  updateAt: string;
  author: Author;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function AllBlogsClients() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 6,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [minViews, setMinViews] = useState<number | undefined>();
  const [maxViews, setMaxViews] = useState<number | undefined>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "6",
        search,
        sortBy,
        order,
      });

      if (minViews) params.append("minViews", String(minViews));
      if (maxViews) params.append("maxViews", String(maxViews));
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await api.get(`/blog?${params.toString()}`, {
        withCredentials: true,
      });

      const blogsData = res.data?.data ?? [];
      const paginationData = res.data?.pagination ?? {
        total: blogsData.length,
        page: 1,
        limit: 6,
        totalPages: 1,
      };

      setBlogs(blogsData);
      setPagination(paginationData);
    } catch (err) {
      console.error("❌ Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, sortBy, order, page, minViews, maxViews, startDate, endDate]);

  const nextPage = () => {
    if (page < pagination.totalPages) setPage((p) => p + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  return (
    <section className="min-h-screen mt-11 w-full bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] py-10 px-4 sm:px-6 lg:px-10 font-poppins relative overflow-hidden">
      {/* Decorative Blurs & Glow */}
      <div className="absolute -top-32 -left-32 w-[340px] h-[340px] bg-[#612DDD]/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-8 w-44 h-44 bg-[#9F6BFF]/20 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-52 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#38c7ff]/30 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-[#612DDD] via-[#ff6fd8] to-[#38c7ff] text-transparent bg-clip-text leading-tight drop-shadow-xl">
            Explore Inspiring Blogs ✨
          </h1>
          <p className="text-[#612DDD] dark:text-[#9F6BFF] mt-2 text-base sm:text-lg font-semibold">
            Dive into stories, tutorials & insights from passionate writers.
          </p>
        </div>

        {/* Filter Panel */}
        <div className="bg-white/90 dark:bg-[#181038]/80 rounded-2xl shadow-lg border border-[#612DDD]/10 p-4 sm:p-6 mb-10 backdrop-blur-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <IoFilterCircleSharp className="text-[#612DDD] text-2xl" />
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-transparent bg-clip-text">
                Blog Explorer
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-end">
              {/* Search */}
              <div className="relative w-full sm:w-auto">
                <BiSearchAlt
                  size={18}
                  className="absolute left-3 top-3 text-[#612DDD] opacity-70"
                />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-56 md:w-64 pl-10 pr-4 py-2 rounded-lg border border-[#612DDD]/30 dark:border-[#9F6BFF]/30 bg-gray-50 dark:bg-[#23214e] text-[#612DDD] dark:text-[#9F6BFF] font-semibold focus:ring-2 focus:ring-[#612DDD] outline-none text-sm transition"
                />
              </div>

              {/* Views Filter */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/30 dark:border-[#9F6BFF]/30 text-sm">
                <BsEyeFill className="text-[#612DDD]" />
                <input
                  type="number"
                  placeholder="Min"
                  value={minViews ?? ""}
                  onChange={(e) =>
                    setMinViews(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-16 sm:w-20 bg-transparent outline-none text-[#612DDD] dark:text-[#9F6BFF] font-bold"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxViews ?? ""}
                  onChange={(e) =>
                    setMaxViews(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-16 sm:w-20 bg-transparent outline-none text-[#612DDD] dark:text-[#9F6BFF] font-bold"
                />
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/30 dark:border-[#9F6BFF]/30 text-sm">
                <CalendarRange className="text-[#612DDD]" size={16} />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent outline-none text-[#612DDD] dark:text-[#9F6BFF] font-bold w-28 sm:w-32"
                />
                <span>-</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent outline-none text-[#612DDD] dark:text-[#9F6BFF] font-bold w-28 sm:w-32"
                />
              </div>

              {/* Sort + Order */}
              <div className="flex gap-2">
                <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/30 dark:border-[#9F6BFF]/30 text-sm">
                  <SortAsc className="text-[#612DDD]" size={16} />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent outline-none text-[#612DDD] dark:text-[#9F6BFF] font-bold"
                  >
                    <option value="createAt">Newest</option>
                    <option value="views">Most Viewed</option>
                    <option value="title">Title (A-Z)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/30 dark:border-[#9F6BFF]/30 text-sm">
                  <SortDesc className="text-[#612DDD]" size={16} />
                  <select
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="bg-transparent outline-none text-[#612DDD] dark:text-[#9F6BFF] font-bold"
                  >
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Cards */}
        {loading ? (
          <div className="text-center py-12"><RippleLoader size={100}></RippleLoader></div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-[#612DDD] dark:text-[#9F6BFF] font-bold">
            No blogs found 😔
          </p>
        ) : (
          <motion.div
            layout
            className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.07 }}
                className="group bg-white/90 dark:bg-[#181038]/80 rounded-3xl shadow-lg border border-[#612DDD]/10 hover:shadow-2xl hover:shadow-[#612DDD]/40 hover:-translate-y-2 hover:scale-[1.03] transition-all duration-300 p-6 flex flex-col justify-between relative backdrop-blur-xl"
                style={{ boxShadow: "0 8px 32px 0 #612DDD22" }}
              >
                {/* Card Glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-300"
                  style={{
                    background: "radial-gradient(ellipse at 60% 20%, #612DDD88 20%, transparent 75%)",
                    filter: "blur(18px)",
                  }}
                />
                {/* Title & Description */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#612DDD] dark:text-[#9F6BFF] mb-2 line-clamp-2 transition group-hover:text-[#38c7ff]">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-md line-clamp-3 mb-4 opacity-[85%]">
                    {blog.content}
                  </p>
                </div>

                {/* Footer Section */}
                <div className="mt-auto">
                  {/* Date + Views */}
                  <div className="flex justify-between items-center text-xs sm:text-sm text-[#612DDD] dark:text-[#9F6BFF] border-t pt-3 border-[#612DDD]/20 dark:border-[#9F6BFF]/30 font-semibold">
                    <span className="flex items-center gap-1">
                      <CalendarDays size={15} />
                      {new Date(blog.createAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={15} /> {blog.views}
                    </span>
                  </div>

                  {/* Author Info */}
                  <div className="mt-3 flex items-center justify-between bg-gradient-to-r from-[#612DDD] to-[#38c7ff] rounded-lg px-3 py-2 text-white text-xs font-bold shadow-sm">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {blog.author.name}
                    </span>
                    <a
                      href={`mailto:${blog.author.email}`}
                      className="underline hover:text-white truncate max-w-[120px]"
                    >
                      {blog.author.email}
                    </a>
                  </div>

                  {/* View Button */}
                  <div className="mt-4 flex justify-center">
                    <Link
                      href={`/blog/${blog.id}`}
                      className="w-full text-center text-sm font-bold bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] hover:from-[#38c7ff] hover:to-[#612DDD] text-white px-5 py-2 rounded-xl shadow-lg hover:scale-[1.06] hover:shadow-purple-glow transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages >= 1 && (
          <div className="flex flex-wrap justify-center items-center mt-10 gap-3 text-sm sm:text-base">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="p-2 sm:p-3 rounded-full bg-[#f3eaff] dark:bg-[#181038] border border-[#612DDD]/20 dark:border-[#9F6BFF]/20 hover:bg-[#612DDD]/10 text-[#612DDD] dark:text-[#9F6BFF] font-bold disabled:opacity-40 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-[#612DDD] dark:text-[#9F6BFF] font-bold">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={page === pagination.totalPages}
              className="p-2 sm:p-3 rounded-full bg-[#f3eaff] dark:bg-[#181038] border border-[#612DDD]/20 dark:border-[#9F6BFF]/20 hover:bg-[#612DDD]/10 text-[#612DDD] dark:text-[#9F6BFF] font-bold disabled:opacity-40 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Card Glow Style & Animation */}
      <style jsx>{`
        .shadow-purple-glow {
          box-shadow: 0 0 20px 0 #612DDD99 !important;
        }
      `}</style>
      <style jsx global>{`
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