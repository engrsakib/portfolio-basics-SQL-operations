"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { FiExternalLink, FiUser, FiMail } from "react-icons/fi";
import Link from "next/link";
import { VscLiveShare } from "react-icons/vsc";
import RippleLoader from "@/components/laoding/RippleLoader";

interface User {
  name: string;
  email: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  features: string[];
  thumbnail: string[];
  liveUrl: string;
  clickCount: number;
  createAt: string;
  user?: User;
}

const featureColors = [
  "from-[#612DDD] to-[#ff6fd8]",
  "from-[#38c7ff] to-[#612DDD]",
  "from-[#9F6BFF] to-[#38c7ff]",
  "from-[#ff6fd8] to-[#612DDD]",
  "from-[#612DDD] to-[#38c7ff]",
];

export default function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [feature, setFeature] = useState("");
  const [minClick, setMinClick] = useState(0);
  const [maxClick, setMaxClick] = useState(1000);
  const [sortOrder, setSortOrder] = useState("desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get(
        `/project?page=${page}&limit=6&search=${search}&features=${feature}&minClick=${minClick}&maxClick=${maxClick}&sortBy=clickCount&order=${sortOrder}`
      );
      const projectsData = res.data?.data?.data || [];
      const paginationData = res.data?.data?.pagination || {
        totalPages: 1,
        page: 1,
      };
      setProjects(projectsData);
      setTotalPages(paginationData.totalPages || 1);
    } catch (err) {
      console.error("❌ Error fetching projects", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, feature, minClick, maxClick, sortOrder, page]);

  return (
    <div className="p-6 mt-11 min-h-screen bg-gradient-to-br from-[#612DDD] via-[#f3eaff] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] font-poppins">
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 bg-white/80 dark:bg-[#1a1333]/80 p-4 rounded-xl shadow-lg backdrop-blur-lg border border-[#612DDD]/20">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          className="border border-[#612DDD]/30 rounded-lg px-3 py-2 w-48 focus:border-[#612DDD] focus:ring-2 focus:ring-[#612DDD]/30 transition"
        />

        <select
          value={feature}
          onChange={(e) => {
            setPage(1);
            setFeature(e.target.value);
          }}
          className="border border-[#612DDD]/30 rounded-lg px-3 py-2 focus:border-[#612DDD] focus:ring-2 focus:ring-[#612DDD]/30 transition"
        >
          <option value="">All Features</option>
          <option value="Responsive design">Responsive Design</option>
          <option value="Dark mode toggle">Dark Mode</option>
          <option value="SEO optimized">SEO Optimized</option>
        </select>

        <input
          type="number"
          value={minClick}
          onChange={(e) => {
            setPage(1);
            setMinClick(Number(e.target.value));
          }}
          placeholder="Min Clicks"
          className="border border-[#612DDD]/30 rounded-lg px-3 py-2 w-28 focus:border-[#612DDD] focus:ring-2 focus:ring-[#612DDD]/30 transition"
        />
        <input
          type="number"
          value={maxClick}
          onChange={(e) => {
            setPage(1);
            setMaxClick(Number(e.target.value));
          }}
          placeholder="Max Clicks"
          className="border border-[#612DDD]/30 rounded-lg px-3 py-2 w-28 focus:border-[#612DDD] focus:ring-2 focus:ring-[#612DDD]/30 transition"
        />

        <select
          value={sortOrder}
          onChange={(e) => {
            setPage(1);
            setSortOrder(e.target.value);
          }}
          className="border border-[#612DDD]/30 rounded-lg px-3 py-2 focus:border-[#612DDD] focus:ring-2 focus:ring-[#612DDD]/30 transition"
        >
          <option value="desc">Most Clicked</option>
          <option value="asc">Least Clicked</option>
        </select>
      </div>

      {/* Project Cards */}
      {loading ? (
        <div className="w-full flex justify-center py-20">
          <RippleLoader />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, idx) => (
            <div
              key={p.id}
              className={`group relative shadow-lg bg-white/90 dark:bg-[#181038]/80 rounded-3xl overflow-hidden border border-[#612DDD]/10
                backdrop-blur-xl transition-all duration-300
                hover:shadow-2xl hover:shadow-[#612DDD]/40
                hover:-translate-y-2 hover:scale-[1.04]
                `}
              style={{
                boxShadow: "0 8px 32px 0 #612DDD22",
              }}
            >
              {/* Card Glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-300"
                style={{
                  background: "radial-gradient(ellipse at 60% 20%, #612DDD88 20%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Thumbnail */}
              <div className="relative">
                {p.thumbnail?.[0] && (
                  <img
                    src={p.thumbnail[0]}
                    alt={p.title}
                    className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-3xl"
                  />
                )}
                <span className="absolute top-2 left-2 bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white text-xs px-3 py-1 rounded-full shadow font-bold">
                  New
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-2xl font-bold opacity-[90%] group-hover:text-[#612DDD] dark:group-hover:text-[#9F6BFF] transition">
                  {p.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-md opacity-[80%] mt-1 line-clamp-2">
                  {p.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {p.features.map((f, i) => (
                    <span
                      key={i}
                      className={`px-2 py-[3px] mt-[-7px] text-[14px] font-bold rounded-full bg-clip-text text-transparent bg-gradient-to-r ${
                        featureColors[i % featureColors.length]
                      } shadow`}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex flex-col gap-2 mt-4 text-sm">
                  <div className="flex justify-between text-md font-bold text-[#612DDD] dark:text-[#9F6BFF]">
                    <span>
                      Created:{" "}
                      {new Date(p.createAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span>Clicks: {p.clickCount}</span>
                  </div>

                  {p.user && (
                    <div className="mt-2 flex flex-col gap-1 text-[#612DDD] dark:text-[#9F6BFF] font-medium opacity-[70%] mb-5">
                      <span className="flex items-center gap-2">
                        <FiUser /> {p.user.name}
                      </span>
                      <span className="flex items-center gap-2">
                        <FiMail /> {p.user.email}
                      </span>
                      {/* set live url and View Btn */}
                      <div className="flex gap-4 flex-wrap mt-2">
                        <Link
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-white bg-gradient-to-r from-[#38c7ff] via-[#612DDD] to-[#9F6BFF] hover:from-[#612DDD] hover:to-[#38c7ff] font-semibold rounded-md px-4 py-2 text-md shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <VscLiveShare className="text-lg" />
                          Live
                        </Link>
                        <Link href={`/project/${p.id}`}>
                          <button
                            className="inline-flex items-center font-bold text-white bg-gradient-to-r from-[#612DDD] via-[#9F6BFF] to-[#38c7ff] hover:bg-gradient-to-br rounded-md py-2 px-8 shadow-md hover:shadow-purple-glow transition-all duration-300"
                          >
                            View
                            <FiExternalLink className="ml-2" />
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-5 py-2 border rounded-xl bg-[#f3eaff] dark:bg-[#181038] hover:bg-[#612DDD]/10 text-[#612DDD] dark:text-[#9F6BFF] font-bold disabled:opacity-50 transition-all"
        >
          Prev
        </button>
        <span className="text-md font-bold text-[#612DDD] dark:text-[#9F6BFF]">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-5 py-2 border rounded-xl bg-[#f3eaff] dark:bg-[#181038] hover:bg-[#612DDD]/10 text-[#612DDD] dark:text-[#9F6BFF] font-bold disabled:opacity-50 transition-all"
        >
          Next
        </button>
      </div>

      {/* Card Glow Style */}
      <style jsx>{`
        .shadow-purple-glow {
          box-shadow: 0 0 20px 0 #612DDD99 !important;
        }
      `}</style>
    </div>
  );
}