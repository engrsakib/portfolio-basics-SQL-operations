"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../auth/authHook/UseAuth";

interface ApiError {
  code?: string;
  path?: string[];
  message: string;
}

export default function ProjectForm() {

  const {user, loading:authLoading} = useAuth("ADMIN")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    features: "",
    thumbnail: "",
    liveUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]); 
  const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        features: formData.features
          ? formData.features.split(",").map((f) => f.trim())
          : [],
        thumbnail: formData.thumbnail
          ? formData.thumbnail.split(",").map((t) => t.trim())
          : [],
        liveUrl: formData.liveUrl,
        authorId: 1,
      };


      const res = await axios.post(
        `${baseUrl}/api/v1/project`,
        payload,
        { withCredentials: true }
      );

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: res.data.message || "Project created successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      setFormData({
        title: "",
        description: "",
        features: "",
        thumbnail: "",
        liveUrl: "",
      });
    } catch (error: any) {
      const errData = error.response?.data;
      if (Array.isArray(errData)) {
        setErrors(errData.map((e: ApiError) => e.message)); // শুধু message রাখবো
      } else if (errData?.message) {
        setErrors([errData.message]);
      } else {
        setErrors(["Unexpected error occurred!"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">🚀 Create Project</h2>

      {/* Error Alerts */}
      {errors.length > 0 && (
        <div className="mb-4 space-y-2">
          {errors.map((msg, idx) => (
            <div
              key={idx}
              className="p-3 rounded-md border border-red-300 bg-red-50 text-red-700 text-sm"
            >
              ⚠ {msg}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          rows={3}
          required
        />

        <input
          type="text"
          name="features"
          placeholder="Features (comma separated: Responsive, Dark Mode, SEO)"
          value={formData.features}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />

        <input
          type="text"
          name="thumbnail"
          placeholder="Thumbnail URLs (comma separated)"
          value={formData.thumbnail}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />

        <input
          type="url"
          name="liveUrl"
          placeholder="Live URL (https://...)"
          value={formData.liveUrl}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded-lg dark:bg-gray-800 dark:border-gray-700"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}