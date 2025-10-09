

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
      setTotalVisitors(res.data.pagination.total); // Set total visitors from pagination data
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
    <div className="p-6">
      {/* Total Visitors */}
      <div className="flex items-center justify-between mb-6 w-[20%] mx-auto bg-gradient-to-r from-green-400 to-blue-600 p-4 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-white">Total Visitors</h2>
        <span className="text-xl text-white font-bold">{totalVisitors}</span>
      </div>

      {/* Table Header */}
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Visitor Logs</h2>

      {/* Table */}
      {loading ? (
        <p>Loading visitors...</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Visitor Id</th>
                <th className="py-3 px-6 text-left">User Agent</th>
                <th className="py-3 px-6 text-left">Device</th>
                <th className="py-3 px-6 text-left">Page</th>
                <th className="py-3 px-6 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {visitors.map((visitor: any) => (
                <tr key={visitor.id} className="border-t hover:bg-gray-100 dark:hover:bg-gray-700">
                  <td className="py-4 px-6">{visitor.ip}</td>
                  <td className="py-4 px-6">{visitor.userAgent}</td>
                  <td className="py-4 px-6">
                    {visitor.device === "Desktop" ? (
                      <FaDesktop className="inline-block text-xl text-blue-600" />
                    ) : (
                      <FaMobileAlt className="inline-block text-xl text-green-600" />
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <a
                      href={visitor.page}
                      target="_blank"
                      className="text-indigo-600 hover:underline"
                    >
                      {visitor.page}
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <FaRegClock className="text-gray-500" />
                      <span>{new Date(visitor.createdAt).toLocaleString()}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-lg">
          Page {page} of {pagination.totalPages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
