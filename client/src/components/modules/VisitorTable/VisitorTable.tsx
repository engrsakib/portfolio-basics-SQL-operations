"use client";

import { useState, useEffect } from "react";
import { FaUser, FaDesktop, FaMobileAlt, FaRegClock } from "react-icons/fa";
import api from "@/lib/api";

export default function VisitorTable() {
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<any>({});
  const [page, setPage] = useState(1);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);

  const fetchVisitors = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/dashboard/visitor?page=${page}&limit=10`);
      setVisitors(res.data.visitors);
      setPagination(res.data.pagination);
      setTotalVisitors(res.data.pagination.total);
    } catch (err) {
      console.error("Error fetching visitors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [page]);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] font-poppins relative overflow-x-auto">
      {/* Decorative Blurs */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#612DDD]/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 right-6 w-32 h-32 bg-[#9F6BFF]/20 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#38c7ff]/30 rounded-full blur-2xl -z-10"></div>

      {/* Total Visitors */}
      <div className="flex items-center justify-center mb-10 w-full mx-auto">
        <div className="bg-gradient-to-r from-[#612DDD] to-[#38c7ff] px-8 py-6 rounded-2xl shadow-xl flex items-center gap-6">
          <FaUser className="text-white text-4xl drop-shadow-xl" />
          <div className="flex flex-col">
            <span className="text-white text-2xl font-bold tracking-wide">Total Visitors</span>
            <span className="text-white text-3xl font-extrabold">{totalVisitors}</span>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <h2 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow-lg">
        Visitor Logs
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white/90 dark:bg-[#181038]/80 shadow-2xl rounded-3xl backdrop-blur-xl border border-[#612DDD]/20 max-w-5xl mx-auto">
        {loading ? (
          <p className="text-center text-lg text-[#612DDD] py-10">Loading visitors...</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white text-lg">
              <tr>
                <th className="py-4 px-6 text-left rounded-tl-3xl">Visitor Id</th>
                <th className="py-4 px-6 text-left">User Agent</th>
                <th className="py-4 px-6 text-left">Device</th>
                <th className="py-4 px-6 text-left">Page</th>
                <th className="py-4 px-6 text-left rounded-tr-3xl">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-[#612DDD] dark:text-[#9F6BFF] font-medium">
              {visitors.map((visitor: any, idx) => (
                <tr
                  key={visitor.id}
                  className={`border-t border-[#E7E8FB] dark:border-[#23214e]/60 transition hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/20 ${idx % 2 === 1 ? "bg-[#f3eaff]/50 dark:bg-[#23214e]/40" : ""}`}
                >
                  <td className="py-4 px-6">{visitor.ip}</td>
                  <td className="py-4 px-6 truncate max-w-[220px]">{visitor.userAgent}</td>
                  <td className="py-4 px-6">
                    {visitor.device === "Desktop" ? (
                      <FaDesktop className="inline-block text-2xl text-[#612DDD]" />
                    ) : (
                      <FaMobileAlt className="inline-block text-2xl text-[#38c7ff]" />
                    )}
                  </td>
                  <td className="py-4 px-6 max-w-[240px]">
                    <a
                      href={visitor.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#38c7ff] hover:underline break-all"
                    >
                      {visitor.page}
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <FaRegClock className="text-[#9F6BFF]" />
                      <span>{new Date(visitor.createdAt).toLocaleString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {!visitors.length && (
                <tr>
                  <td colSpan={5} className="text-center py-8 text-gray-400">
                    No visitors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-7 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-7 py-3 bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg font-bold text-[#612DDD] dark:text-[#9F6BFF]">
          Page {page} of {pagination.totalPages || 1}
        </span>
        <button
          disabled={page === (pagination.totalPages || 1)}
          onClick={() => setPage((p) => p + 1)}
          className="px-7 py-3 bg-gradient-to-r from-[#38c7ff] to-[#612DDD] text-white font-bold rounded-lg shadow-lg hover:scale-105 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}