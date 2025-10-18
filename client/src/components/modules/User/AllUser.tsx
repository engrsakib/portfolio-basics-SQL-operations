"use client";
import RippleLoader from "@/components/laoding/RippleLoader";
import { getAllUsers } from "@/lib/userApi/user";
import { useEffect, useState } from "react";
import { FaUserShield, FaUserAlt } from "react-icons/fa";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createAt?: string; 
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [emailFilter, setEmailFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const query = `?page=${page}&limit=${limit}${
        emailFilter ? `&email=${emailFilter}` : ""
      }${roleFilter ? `&role=${roleFilter}` : ""}`;

      const res = await getAllUsers(query);
      setUsers(res.users || []);
      setTotalPages(res.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, emailFilter, roleFilter]);

  if (loading) return <p className="text-center py-6"><RippleLoader /></p>;

  return (
    <div className="max-w-6xl mx-auto shadow-2xl sm:rounded-3xl p-6 bg-white/80 dark:bg-[#181038]/90 relative overflow-hidden font-poppins">
      {/* Decorative Blurs */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#612DDD]/20 rounded-full blur-2xl -z-10" />
      <div className="absolute top-1/2 right-8 w-32 h-32 bg-[#9F6BFF]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#ff6fd8]/20 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#38c7ff]/20 rounded-full blur-2xl -z-10" />

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow-lg">
        User Management
      </h1>

      {/* 🔍 Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="🔎 Search by email..."
          value={emailFilter}
          onChange={(e) => {
            setPage(1);
            setEmailFilter(e.target.value);
          }}
          className="px-4 py-2 border border-[#612DDD]/30 rounded-xl w-full sm:w-1/2 focus:ring-2 focus:ring-[#612DDD] dark:bg-[#23214e] dark:border-[#9F6BFF]/30 text-[#612DDD] dark:text-[#9F6BFF]"
        />

        <select
          value={roleFilter}
          onChange={(e) => {
            setPage(1);
            setRoleFilter(e.target.value);
          }}
          className="px-4 py-2 border border-[#612DDD]/30 rounded-xl w-full sm:w-1/4 focus:ring-2 focus:ring-[#612DDD] dark:bg-[#23214e] dark:border-[#9F6BFF]/30 text-[#612DDD] dark:text-[#9F6BFF]"
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="relative overflow-x-auto shadow-xl rounded-2xl backdrop-blur-md">
        <table className="w-full text-sm text-left border border-[#612DDD]/10">
          <thead className="text-xs uppercase bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-white">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`transition-all duration-200 ${
                    idx % 2 === 0
                      ? "bg-white/80 dark:bg-[#181038]/80"
                      : "bg-[#f3eaff]/70 dark:bg-[#23214e]/70"
                  } border-b border-[#612DDD]/10 hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/20`}
                >
                  <td className="px-6 py-4 font-semibold flex items-center gap-2 text-[#612DDD] dark:text-[#9F6BFF]">
                    {user.role === "ADMIN" ? (
                      <FaUserShield className="inline text-red-400 text-lg" />
                    ) : (
                      <FaUserAlt className="inline text-[#612DDD] text-lg" />
                    )}
                    {user.name}
                  </td>
                  <td className="px-6 py-4 break-all">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-bold shadow ${
                        user.role === "ADMIN"
                          ? "bg-gradient-to-r from-red-400 to-pink-500 text-white"
                          : "bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.createAt
                      ? new Date(user.createAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center px-6 py-8 text-[#612DDD] dark:text-[#9F6BFF] font-semibold"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination */}
      <div className="flex justify-center items-center gap-8 mt-8">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-6 py-3 bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-lg font-bold text-[#612DDD] dark:text-[#9F6BFF]">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-6 py-3 bg-gradient-to-r from-[#38c7ff] to-[#612DDD] text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-all duration-200 disabled:opacity-50"
        >
          Next
        </button>
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