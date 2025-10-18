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

export default function AllBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
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

      setBlogs(res.data.data || []);
      setPagination(res.data.pagination || null);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, sortBy, order, page, minViews, maxViews, startDate, endDate]);

  const nextPage = () =>
    pagination && page < pagination.totalPages && setPage(page + 1);
  const prevPage = () => pagination && page > 1 && setPage(page - 1);

  return (
    <section className="min-h-screen w-full bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] py-10 px-5 font-poppins relative overflow-hidden">
      {/* Decorative Blurs */}
      <div className="absolute -top-28 -left-28 w-72 h-72 bg-[#612DDD]/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-56 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#38c7ff]/20 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* --- Top Filter Section --- */}
        <div className="bg-white/90 dark:bg-[#181038]/90 rounded-2xl shadow-xl border border-[#612DDD]/20 p-6 mb-10 backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <IoFilterCircleSharp className="text-[#612DDD] text-2xl" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-transparent bg-clip-text">
                Blog Explorer
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              {/* Search */}
              <div className="relative">
                <BiSearchAlt
                  size={18}
                  className="absolute left-3 top-3 text-[#612DDD] opacity-60"
                />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-[#612DDD]/20 dark:border-[#9F6BFF]/30 bg-gray-50 dark:bg-[#23214e] text-[#612DDD] dark:text-[#9F6BFF] focus:ring-2 focus:ring-[#612DDD] outline-none font-semibold"
                />
              </div>

              {/* Min-Max Views */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/20 dark:border-[#9F6BFF]/30">
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
                  className="w-20 bg-transparent text-sm outline-none text-[#612DDD] dark:text-[#9F6BFF] font-semibold"
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
                  className="w-20 bg-transparent text-sm outline-none text-[#612DDD] dark:text-[#9F6BFF] font-semibold"
                />
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/20 dark:border-[#9F6BFF]/30">
                <CalendarRange className="text-[#612DDD]" size={16} />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-sm outline-none text-[#612DDD] dark:text-[#9F6BFF] font-semibold w-28"
                />
                <span>-</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-sm outline-none text-[#612DDD] dark:text-[#9F6BFF] font-semibold w-28"
                />
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/20 dark:border-[#9F6BFF]/30">
                <SortAsc className="text-[#612DDD]" size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none text-sm text-[#612DDD] dark:text-[#9F6BFF] font-semibold"
                >
                  <option value="createAt">Newest</option>
                  <option value="views">Most Viewed</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>

              {/* Order */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#23214e] px-3 py-2 rounded-lg border border-[#612DDD]/20 dark:border-[#9F6BFF]/30">
                <SortDesc className="text-[#612DDD]" size={16} />
                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="bg-transparent outline-none text-sm text-[#612DDD] dark:text-[#9F6BFF] font-semibold"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* --- Blog Grid --- */}
        {loading ? (
          <p className="text-center text-[#612DDD] dark:text-[#9F6BFF] animate-pulse">
           <RippleLoader></RippleLoader>
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-[#612DDD] dark:text-[#9F6BFF] font-semibold">
            No blogs found 😔
          </p>
        ) : (
          <motion.div
            layout
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/90 dark:bg-[#181038]/90 rounded-3xl shadow-xl border border-[#612DDD]/10 hover:shadow-2xl hover:shadow-[#612DDD]/40 hover:-translate-y-2 hover:scale-[1.03] transition-all p-6 flex flex-col justify-between relative backdrop-blur-xl animate-fade-in-up"
              >
                {/* Purple Glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-70 transition-all duration-300"
                  style={{
                    background: "radial-gradient(ellipse at 60% 20%, #612DDD88 20%, transparent 75%)",
                    filter: "blur(18px)",
                  }}
                />
                <h3 className="text-lg font-bold text-[#612DDD] dark:text-[#9F6BFF] mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4">
                  {blog.content}
                </p>

                <div className="flex justify-between items-center text-xs text-[#612DDD] dark:text-[#9F6BFF] border-t pt-3 border-[#612DDD]/20 dark:border-[#9F6BFF]/30 font-semibold">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={15} />{" "}
                    {new Date(blog.createAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={15} /> {blog.views}
                  </span>
                </div>

                {/* Author + Buttons */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between bg-gradient-to-r from-[#612DDD] to-[#38c7ff] rounded-lg px-3 py-2 text-white text-xs font-bold shadow-sm">
                    <span className="flex items-center gap-1">
                      <User size={12} /> {blog.author.name}
                    </span>
                    <a
                      href={`mailto:${blog.author.email}`}
                      className="underline hover:text-gray-100 truncate max-w-[130px]"
                    >
                      {blog.author.email}
                    </a>
                  </div>

                  <div className="flex justify-between items-center gap-3">
                    <Link
                      href={`/dashboard/blog/all-blog/update/${blog.id}`}
                      className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-[#38c7ff] to-[#612DDD] text-white text-sm font-bold shadow-md hover:scale-105 hover:shadow-purple-glow transition-all"
                    >
                      Update
                    </Link>

                    <Link
                      href={`/dashboard/blog/all-blog/delete/${blog.id}`}
                      className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-[#ff6fd8] to-[#612DDD] text-white text-sm font-bold shadow-md hover:scale-105 hover:shadow-purple-glow transition-all"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* --- Pagination --- */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-3">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="p-2 rounded-full bg-white dark:bg-[#181038] border border-[#612DDD]/10 dark:border-[#9F6BFF]/20 hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/20 text-[#612DDD] dark:text-[#9F6BFF] font-bold disabled:opacity-40 transition"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-[#612DDD] dark:text-[#9F6BFF] text-sm font-bold">
              Page {pagination.page} of {pagination.totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={page === pagination.totalPages}
              className="p-2 rounded-full bg-white dark:bg-[#181038] border border-[#612DDD]/10 dark:border-[#9F6BFF]/20 hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/20 text-[#612DDD] dark:text-[#9F6BFF] font-bold disabled:opacity-40 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .shadow-purple-glow {
          box-shadow: 0 0 20px 0 #612DDD99 !important;
        }
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