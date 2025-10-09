
"use client";
import RippleLoader from "@/components/laoding/RippleLoader";
import { getAllUsers } from "@/lib/userApi/user";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createAt?: string; 
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]);
  console.log(users)
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
  // 

  if (loading) return <p className="text-center py-6"><RippleLoader></RippleLoader></p>;

  return (
    <div className="max-w-6xl mx-auto shadow-md sm:rounded-lg p-4 bg-white dark:bg-gray-900">
      {/* 🔍 Filter Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by email..."
          value={emailFilter}
          onChange={(e) => {
            setPage(1);
            setEmailFilter(e.target.value);
          }}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/2 
                     focus:ring-2 focus:ring-indigo-500 
                     dark:bg-gray-800 dark:border-gray-700"
        />

        <select
          value={roleFilter}
          onChange={(e) => {
            setPage(1);
            setRoleFilter(e.target.value);
          }}
          className="px-4 py-2 border rounded-lg w-full sm:w-1/4 
                     focus:ring-2 focus:ring-indigo-500 
                     dark:bg-gray-800 dark:border-gray-700"
        >
          <option value="">All Roles</option>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>

      {/* 📋 Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300 border">
          <thead className="text-xs text-gray-700 uppercase bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Created At</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, idx) => (
                <tr
                  key={user.id}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  } border-b dark:border-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-700 transition`}
                >
                  <td className="px-6 py-3 font-medium text-gray-900 dark:text-white">
                    {user.name}
                  </td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "ADMIN"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                          : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-3">
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
                  className="text-center px-6 py-4 text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 📌 Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 
                     hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 
                     hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          Next
        </button>
      </div>
    </div>
  );
}
