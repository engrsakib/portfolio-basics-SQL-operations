"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Swal from "sweetalert2";

export default function UpdateBlogPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await api.get(`/blog/${id}`, { withCredentials: true });
      setFormData({
        title: res.data.data.title,
        content: res.data.data.content,
      });
    };
    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const confirm = await Swal.fire({
      title: "Confirm Update",
      text: "Do you want to save these changes?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Update",
    });

    if (!confirm.isConfirmed) {
      setLoading(false);
      return;
    }

    try {
      await api.put(`/blog/${id}`, formData, { withCredentials: true });

      await Swal.fire({
        title: "Updated!",
        text: "Blog has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#2563eb",
      });

      router.push("/dashboard/blog/all-blog");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to update blog. Try again later.",
        icon: "error",
        confirmButtonColor: "#e02424",
      });
      console.error("Update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-sky-500 to-blue-600 text-transparent bg-clip-text">
          ✏️ Update Blog
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2 text-sm font-medium">
              Blog Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition"
              placeholder="Enter blog title..."
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2 text-sm font-medium">
              Blog Content
            </label>
            <textarea
              rows={7}
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none transition"
              placeholder="Write your blog content here..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-sky-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
          >
            {loading ? "Updating..." : "Update Blog + View Count"}
          </button>
        </form>
      </div>
    </section>
  );
}
