"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { FaProjectDiagram, FaBlog, FaRegFileAlt, FaUser, FaRegChartBar, FaChevronLeft } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [openProject, setOpenProject] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openResume, setOpenResume] = useState(false);

  const getLinkClass = (href: string) => {
    const base = "flex items-center gap-2 p-3 rounded-xl font-semibold transition-all duration-200";
    const active =
      "bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white shadow-xl scale-[1.06]";
    const normal =
      "text-[#612DDD] dark:text-[#9F6BFF] hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/30 hover:scale-[1.04]";
    return pathname === href ? `${base} ${active}` : `${base} ${normal}`;
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-gradient-to-br from-[#f3eaff] via-white to-[#612DDD]/10 dark:from-[#181038] dark:via-[#23214e] dark:to-[#612DDD]/40 shadow-2xl border-r border-[#612DDD]/20 font-poppins overflow-y-auto"
      aria-label="Sidebar"
    >
      {/* Decorative Glow */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-[#612DDD]/40 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#ff6fd8]/40 rounded-full blur-2xl -z-10" />

      <div className="h-full px-5 py-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 mb-10 pl-2">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 drop-shadow-lg"
            alt="Logo"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow-xl">
            Portfolio Dashboard
          </span>
        </Link>

        <ul className="space-y-3">
          <li>
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              <FaRegChartBar /> Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/device-activity"
              className={getLinkClass("/dashboard/device-activity")}
            >
              <FaChevronLeft /> Device Activity Log
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/today-visitor"
              className={getLinkClass("/dashboard/today-visitor")}
            >
              <FaUser /> Today Visitor
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/user"
              className={getLinkClass("/dashboard/user")}
            >
              <FaUser /> Users
            </Link>
          </li>

          {/* 🧩 Project Dropdown */}
          <li>
            <button
              onClick={() => setOpenProject(!openProject)}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold transition-all duration-200 ${
                openProject
                  ? "bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white shadow-xl scale-[1.03]"
                  : "text-[#612DDD] dark:text-[#9F6BFF] hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/30 hover:scale-[1.04]"
              }`}
            >
              <span className="flex items-center gap-2"><FaProjectDiagram /> Projects</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${openProject ? "rotate-180" : ""}`}
              />
            </button>
            {openProject && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    href="/dashboard/dash-project/create-dash-project"
                    className={getLinkClass("/dashboard/dash-project/create-dash-project")}
                  >
                    ➕ Create Project
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/dash-project/get-all-project"
                    className={getLinkClass("/dashboard/dash-project/get-all-project")}
                  >
                    📋 All Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/dash-project/top-click"
                    className={getLinkClass("/dashboard/dash-project/top-click")}
                  >
                    🚀 Top Click-(4)
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* 📰 Blog Dropdown */}
          <li>
            <button
              onClick={() => setOpenBlog(!openBlog)}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold transition-all duration-200 ${
                openBlog
                  ? "bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white shadow-xl scale-[1.03]"
                  : "text-[#612DDD] dark:text-[#9F6BFF] hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/30 hover:scale-[1.04]"
              }`}
            >
              <span className="flex items-center gap-2"><FaBlog /> Blogs</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${openBlog ? "rotate-180" : ""}`}
              />
            </button>
            {openBlog && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    href="/dashboard/blog/create-blog"
                    className={getLinkClass("/dashboard/blog/create-blog")}
                  >
                    ➕ Create Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/blog/all-blog"
                    className={getLinkClass("/dashboard/blog/all-blog")}
                  >
                    📋 All Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/blog/categories"
                    className={getLinkClass("/dashboard/blog/categories")}
                  >
                    🏷️ Categories
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* 🧾 Resume Dropdown */}
          <li>
            <button
              onClick={() => setOpenResume(!openResume)}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-semibold transition-all duration-200 ${
                openResume
                  ? "bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white shadow-xl scale-[1.03]"
                  : "text-[#612DDD] dark:text-[#9F6BFF] hover:bg-[#612DDD]/10 dark:hover:bg-[#612DDD]/30 hover:scale-[1.04]"
              }`}
            >
              <span className="flex items-center gap-2"><FaRegFileAlt /> Resume</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${openResume ? "rotate-180" : ""}`}
              />
            </button>
            {openResume && (
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <Link
                    href="/dashboard/resume/create-resume"
                    className={getLinkClass("/dashboard/resume/create-resume")}
                  >
                    ➕ Create Resume
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/resume/all-resume"
                    className={getLinkClass("/dashboard/resume/get-all-resume")}
                  >
                    📋 All Resume
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
      {/* Custom shadow CSS */}
      <style jsx>{`
        .shadow-xl {
          box-shadow: 0 0 24px 0 #612DDD99 !important;
        }
      `}</style>
    </aside>
  );
}