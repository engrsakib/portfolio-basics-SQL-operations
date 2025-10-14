

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function UpdateProjectPage() {
  const router = useRouter();
  const { id } = useParams(); 
  const [loading, setLoading] = useState(true);

  // 🧠 All project fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string[]>([]);
  const [liveUrl, setLiveUrl] = useState("");

  // 🔹 Project details fetch করে form prefill করা
  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      try {
        const res = await api.get(`/project/${id}`);
        const project = res.data.data;
        setTitle(project.title || "");
        setDescription(project.description || "");
        setFeatures(project.features || []);
        setThumbnail(project.thumbnail || []);
        setLiveUrl(project.liveUrl || "");
      } catch (error) {
        console.error("Error loading project", error);
        alert("❌ Project not found!");
        router.push("/dashboard/dash-project/get-all-project");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // 🔹 Update Handler
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.put(`/project/${id}`, {
        title,
        description,
        features,
        thumbnail,
        liveUrl,
      });

    
Swal.fire({
  title: `Project Update Successfully-${id}`,
  icon: "success",
  draggable: true
});
     
      router.push("/dashboard/dash-project/get-all-project");
    } catch (error) {
      console.error("❌ Error updating project", error);
      alert("Failed to update project!");
    }
  };

  // 🔹 Helper: Array fields input change
  const handleArrayChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const addNewField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (index: number, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  // 🔹 Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading project data...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center py-10">
      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-[500px] space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-indigo-600 flex items-center justify-center gap-2">
         Update Lastest Project :-{id}
        </h2>

        {/* Title */}
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />

        {/* Description */}
        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 h-24 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />

        {/* Live URL */}
        <input
          type="text"
          placeholder="Live Project URL"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
        />

        {/* Features */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            Features:
          </label>
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={f}
                onChange={(e) => handleArrayChange(i, e.target.value, setFeatures)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                placeholder={`Feature ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeField(i, setFeatures)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewField(setFeatures)}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            ➕ Add Feature
          </button>
        </div>

        {/* Thumbnails */}
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
            Thumbnails (URLs):
          </label>
          {thumbnail.map((t, i) => (
            <div key={i} className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={t}
                onChange={(e) => handleArrayChange(i, e.target.value, setThumbnail)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                placeholder={`Image URL ${i + 1}`}
              />
              <button
                type="button"
                onClick={() => removeField(i, setThumbnail)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addNewField(setThumbnail)}
            className="mt-2 text-sm text-blue-500 hover:underline"
          >
            ➕ Add Thumbnail
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-indigo-700 transition"
        >
           Update Project
        </button>
      </form>
    </div>
  );
}





