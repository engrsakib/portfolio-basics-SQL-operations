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

  const baseUrl = process.env.NEXT_PUBLIC_BASE_API || "http://localhost:3000";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${baseUrl}project/${params.id}`, {
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e]">
        <RippleLoader />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e]">
        <h1 className="text-3xl font-bold text-red-600">❌ {error || "Project Not Found"}</h1>
        <p className="text-gray-500 mt-2">Please check your project ID or login.</p>
      </div>
    );
  }

  // ✅ Project Card UI
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] font-poppins relative overflow-hidden">
      {/* Decorative Blurs & Glows */}
      <div className="absolute -top-32 -left-32 w-[320px] h-[320px] bg-[#612DDD]/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#38c7ff]/30 rounded-full blur-2xl -z-10" />
      <div className="absolute top-1/2 right-10 w-36 h-36 bg-[#9F6BFF]/20 rounded-full blur-2xl -z-10" />

      <div className="max-w-2xl w-full mx-auto bg-white/90 dark:bg-[#181038]/80 rounded-3xl shadow-2xl border border-[#612DDD]/20 overflow-hidden backdrop-blur-xl animate-fade-in-up relative">
        {/* Card Glow on hover */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-60 transition-all duration-300"
          style={{
            background: "radial-gradient(ellipse at 60% 20%, #612DDD66 20%, transparent 75%)",
            filter: "blur(18px)",
          }}
        />

        {/* Thumbnail */}
        {project.thumbnail?.[0] && (
          <img
            src={project.thumbnail[0]}
            alt={project.title}
            className="w-full h-72 object-cover rounded-t-3xl shadow-lg"
          />
        )}

        {/* Content */}
        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow">
            {project.title}
          </h1>
          <p className="text-gray-700 dark:text-gray-200 mb-5 leading-relaxed text-lg">
            {project.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-5">
            {project.features?.map((feature, i) => (
              <span
                key={i}
                className={`text-sm px-3 py-1 bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white rounded-full shadow font-bold`}
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Footer Info */}
          <div className="flex justify-between items-center text-md text-[#612DDD] dark:text-[#9F6BFF] border-t border-[#612DDD]/20 dark:border-[#9F6BFF]/30 pt-4 mt-2 font-bold">
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
          <div className="mt-8 flex justify-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-purple-glow transition-all duration-300"
            >
              🌐 Visit Live
            </a>
          </div>
        </div>
      </div>

      {/* Card Glow Style & Animation */}
      <style jsx>{`
        .shadow-purple-glow {
          box-shadow: 0 0 18px 0 #612DDD88 !important;
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.41,.99,.54,.98) both;
        }
      `}</style>
    </div>
  );
}