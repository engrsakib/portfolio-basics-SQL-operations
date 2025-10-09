

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
  Filter,
  CalendarRange,
} from "lucide-react";
import { IoFilterCircleSharp } from "react-icons/io5";
import { BiSearchAlt } from "react-icons/bi";
import { BsEyeFill } from "react-icons/bs";

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

export default function AllBlogsClient() {
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
      setBlogs(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, sortBy, order, page, minViews, maxViews, startDate, endDate]);

  const nextPage = () => pagination && page < pagination.totalPages && setPage(page + 1);
  const prevPage = () => pagination && page > 1 && setPage(page - 1);

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* --- Top Filter Section --- */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <IoFilterCircleSharp className="text-indigo-500 text-2xl" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
                Blog Explorer
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 justify-end">
              {/* Search */}
              <div className="relative">
                <BiSearchAlt
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              {/* Min-Max Views */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
                <BsEyeFill className="text-indigo-500" />
                <input
                  type="number"
                  placeholder="Min"
                  value={minViews ?? ""}
                  onChange={(e) =>
                    setMinViews(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="w-20 bg-transparent text-sm outline-none text-gray-700 dark:text-gray-300"
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={maxViews ?? ""}
                  onChange={(e) =>
                    setMaxViews(e.target.value ? Number(e.target.value) : undefined)
                  }
                  className="w-20 bg-transparent text-sm outline-none text-gray-700 dark:text-gray-300"
                />
              </div>

              {/* Date Range */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
                <CalendarRange className="text-indigo-500" size={16} />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-sm outline-none text-gray-700 dark:text-gray-300"
                />
                <span>-</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-sm outline-none text-gray-700 dark:text-gray-300"
                />
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
                <SortAsc className="text-indigo-500" size={16} />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300"
                >
                  <option value="createAt">Newest</option>
                  <option value="views">Most Viewed</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>

              {/* Order */}
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700">
                <SortDesc className="text-indigo-500" size={16} />
                <select
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  className="bg-transparent outline-none text-sm text-gray-700 dark:text-gray-300"
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
          <p className="text-center text-gray-500 dark:text-gray-400 animate-pulse">
            Loading blogs...
          </p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No blogs found 😔
          </p>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all p-6 border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4">
                  {blog.content}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 border-t pt-3 border-gray-100 dark:border-gray-700">
                  <span className="flex items-center gap-1">
                    <CalendarDays size={15} />{" "}
                    {new Date(blog.createAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={15} /> {blog.views}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg px-3 py-2 text-white text-xs font-medium shadow-sm">
                  <span className="flex items-center gap-1">
                    <User size={12} /> {blog.author.name}
                  </span>
                  <a
                    href={`mailto:${blog.author.email}`}
                    className="underline hover:text-gray-100"
                  >
                    {blog.author.email}
                  </a>
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
              className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-40 transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={page === pagination.totalPages}
              className="p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-40 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
