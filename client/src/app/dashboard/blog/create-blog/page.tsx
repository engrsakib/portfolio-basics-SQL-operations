"use client";

import { useState } from "react";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { useAuth } from "@/components/modules/auth/authHook/UseAuth";


export default function CreateBlogPage() {
  const { user, loading } = useAuth("ADMIN"); 
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // লোডিং অবস্থায় কিছু দেখানো
  if (loading) return <p>Loading user...</p>;
  if (!user) return <p>Please login first!</p>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        title,
        content,
        authorId: user.id, // ✅ এখানে সরাসরি useAuth থেকে authorId
      };

      const res = await api.post("/blog", payload, { withCredentials: true });

      Swal.fire({
        icon: "success",
        title: "✅ Blog Created!",
        text: res.data.message || "Your blog has been published successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setTitle("");
      setContent("");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "❌ Error",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">📝 Create New Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
        />

        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          required
          className="w-full border rounded-lg px-4 py-2 dark:bg-gray-800 dark:border-gray-700"
        />

        <button
          type="submit"
          disabled={saving}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          {saving ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
