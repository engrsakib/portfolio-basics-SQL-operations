"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import RippleLoader from "@/components/laoding/RippleLoader";

interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  thumbnail: string[];
  liveUrl: string;
  clickCount: number;
  createAt: string;
}

export default function SingleProjectPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`https://a-7-portfolio-backend.vercel.app/api/v1/project/${params.id}`, {
          withCredentials: true, 
        });

        if (res.data?.success) {
          setProject(res.data.data); 
        } else {
          setError("Project not found.");
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch project.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg"><RippleLoader></RippleLoader></p>
      </div>
    );
  }


  if (error || !project) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-red-600">❌ {error || "Project Not Found"}</h1>
        <p className="text-gray-500 mt-2">Please check your project ID or login.</p>
      </div>
    );
  }

  // ✅ Project Card UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex justify-center items-center py-10 px-5">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Thumbnail */}
        {project.thumbnail?.[0] && (
          <img
            src={project.thumbnail[0]}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
        )}

        {/* Content */}
        <div className="p-8">
          <h1 className="text-3xl font-bold text-indigo-600 mb-3">{project.title}</h1>
          <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
            {project.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.features?.map((feature, i) => (
              <span
                key={i}
                className="text-sm px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Footer Info */}
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
            <span>
              📅 Created:{" "}
              {new Date(project.createAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
            <span>🔥 Clicks: {project.clickCount}</span>
          </div>

          {/* Live Button */}
          <div className="mt-6 flex justify-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all"
            >
              🌐 Visit Live
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
