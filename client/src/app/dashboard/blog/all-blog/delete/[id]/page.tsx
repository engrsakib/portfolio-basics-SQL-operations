"use client";

import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import { useState } from "react";
import Swal from "sweetalert2";

export default function DeleteBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (loading) return; // prevent double click
    setLoading(true);

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e02424",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) {
      setLoading(false);
      return;
    }

    try {
      await api.delete(`/blog/${id}`, { withCredentials: true });

      await Swal.fire({
        title: "Deleted!",
        text: "Your blog has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#16a34a",
      });

      router.push("/dashboard/blog/all-blog");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to delete blog. Try again later.",
        icon: "error",
        confirmButtonColor: "#e02424",
      });
      console.error("Failed to delete blog", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Confirm Delete</h1>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-6 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            {loading ? "Deleting..." : "Delete Blog"}
          </button>

          <button
            onClick={() => router.push("/dashboard/blog/all-blog")}
            className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg font-medium hover:opacity-80 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
