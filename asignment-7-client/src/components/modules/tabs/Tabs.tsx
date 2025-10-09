
"use client";

import { useState } from "react";
import Link from "next/link";

import Certificate from "../certificate/Certificate";
import TechStackSection from "../tech-Stack/TechStackSection";
import ProjectList from "@/app/project/page";


export default function Tabs() {
  const [activeTab, setActiveTab] = useState("project");

  return (
    <div>
      <div className="flex justify-center items-center lg:mt-32 flex-col  lg:mb-20">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600 bg-clip-text text-transparent ">
          Project Showcase
        </h2>
        <p className="text-gray-600 font-semibold opacity-[60%] text-lg dark:text-gray-300">
          Showcasing my creative and professional projects.
          <br />
          Explore featured projects that highlight my skills.
        </p>
      </div>
      {/* Mobile Select */}
      <div className="sm:hidden mb-4">
        <select
          id="tabs"
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                     focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="project">Project</option>
          <option value="certificate">Certificate</option>
          <option value="tech">Tech Stack</option>
        </select>
      </div>

      {/* Desktop Tabs */}

      <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
        <li className="w-full">
          <button
            onClick={() => setActiveTab("project")}
            className={`inline-block w-full p-4 rounded-s-lg transition-all duration-300 ${
              activeTab === "project"
                ? "bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-white font-semibold"
                : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Project
          </button>
        </li>

        <li className="w-full">
          <button
            onClick={() => setActiveTab("certificate")}
            className={`inline-block w-full p-4 transition-all duration-300 ${
              activeTab === "certificate"
                ? "bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 text-white font-semibold"
                : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Certificate
          </button>
        </li>

        <li className="w-full">
          <button
            onClick={() => setActiveTab("tech")}
            className={`inline-block w-full p-4 rounded-e-lg transition-all duration-300 ${
              activeTab === "tech"
                ? "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 text-white font-semibold"
                : "bg-white text-gray-900 dark:bg-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            Tech Stack
          </button>
        </li>
      </ul>

      {/* Render UI */}
      <div className="mt-6">
        {activeTab === "project" && (
          <div className="flex justify-center items-center flex-col  lg:mb-7">
            <ProjectList></ProjectList>
          </div>
        )}

        {activeTab === "certificate" && (
          <div>
           
            <Certificate></Certificate>
          </div>
        )}

        {activeTab === "tech" && (
          <div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
                ⚡ Technologies I Use to Build Modern Web Experiences
              </h2>
            </div>
            <TechStackSection></TechStackSection>
          </div>
        )}
      </div>
    </div>
  );
}
