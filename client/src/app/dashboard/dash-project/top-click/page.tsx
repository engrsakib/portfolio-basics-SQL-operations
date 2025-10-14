"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  thumbnail: string[];
  liveUrl: string;
  clickCount: number;
  user: { name: string; email: string };
}

export default function TopClickedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchTopProjects = async () => {
      try {
        // fix top clicked
        const res = await axios.get("https://a-7-portfolio-backend.vercel.app/api/v1/project/top-clicked", {
          withCredentials: true,
        });

        if (res.data.success) setProjects(res.data.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchTopProjects();
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-gray-800 mb-4"
        >
           Top Clicked Projects
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-gray-600 max-w-2xl mx-auto mb-12"
        >
          Here are the most popular projects loved by our visitors — explore the best-performing works built by our talented users.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              <div className="relative">
                <img
                  src={project.thumbnail?.[0] || "/default-thumb.jpg"}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {project.clickCount} Clicks
                </span>
              </div>

              <div className="flex flex-col flex-grow text-left p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    By <span className="font-medium">{project.user?.name}</span>
                  </div>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                  >
                    Live <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
