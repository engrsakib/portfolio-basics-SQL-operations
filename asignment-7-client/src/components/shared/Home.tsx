

"use client";
import React from "react";
import Spider from "./Multiple";
import ResizeHandle from "../modules/utils/AutoTexter";
import SinnyBtn from "../modules/utils/SinnyBtn";
import { HelloGradient } from "../modules/utils/Hellow";
import SpaceBtn from "../modules/utils/SpaceBtn";
import ResumeBtn from "../modules/utils/ResumeBtn";
import { CodeBracketIcon, LightBulbIcon } from "@heroicons/react/24/solid";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si"; 
import Link from "next/link";

const Portfolio = () => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center font-sans p-4 sm:p-6 lg:p-8">
      {/* Light Background */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #ffffff 40%, #3b82f6 100%)",
        }}
      />
      {/* Dark Background */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 100%, #000000 40%, #010133 100%)",
        }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-16 items-center">
          {/* ===== Left Column ===== */}
          <div className="flex flex-col gap-4 sm:gap-6 items-start text-left order-2 lg:order-1 animate-fade-in-up">

            {/* Fancy Button */}
            <div className="mt-10">
              <SinnyBtn />
            </div>

            {/* Gradient Hello */}
            <div>
              <HelloGradient />
            </div>

            {/* Dynamic Typing Title */}
            <div className="relative">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-sky-400 dark:to-indigo-500 bg-clip-text text-transparent">
              
                      <ResizeHandle />
           
                </span>
              </h1>
            </div>

            {/* ===== Stack Buttons ===== */}
            <div className="flex flex-wrap gap-2 sm:gap-3 my-2 sm:my-4">
              {/* MERN */}
              <button
                type="button"
                className="flex items-center gap-3 text-white 
                bg-gradient-to-r from-cyan-500 to-blue-500 
                hover:from-blue-500 hover:to-cyan-500
                focus:outline-none
                font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2
                shadow-lg shadow-cyan-400/50 hover:shadow-blue-500/60
                transition-all duration-300"
              >
                <span className="p-1.5 bg-green-600/20 rounded-full shadow-md shadow-green-400/60">
                  <SiMongodb className="text-green-400 text-lg" />
                </span>
                <span className="p-1.5 bg-gray-800/30 rounded-full shadow-md shadow-gray-500/50">
                  <SiExpress className="text-gray-200 text-lg" />
                </span>
                <span className="p-1.5 bg-sky-500/20 rounded-full shadow-md shadow-sky-400/70">
                  <SiReact className="text-sky-300 text-lg" />
                </span>
                <span className="p-1.5 bg-green-500/20 rounded-full shadow-md shadow-green-400/70">
                  <SiNodedotjs className="text-green-500 text-lg" />
                </span>
                MERN Stack
              </button>

              {/* PERN */}
              <button
                type="button"
                className="flex items-center gap-2 text-white 
                bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-500 
                hover:from-cyan-500 hover:to-purple-600 
                focus:outline-none
                font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2
                shadow-lg shadow-blue-500/40 hover:shadow-purple-500/50
                transition-all duration-300"
              >
                <span className="p-1.5 bg-white/10 rounded-full shadow-md">
                  <SiPostgresql className="text-sky-300 text-lg" />
                </span>
                <span className="p-1.5 bg-white/10 rounded-full shadow-md">
                  <SiExpress className="text-gray-200 text-lg" />
                </span>
                <span className="p-1.5 bg-white/10 rounded-full shadow-md">
                  <SiReact className="text-sky-400 text-lg" />
                </span>
                <span className="p-1.5 bg-white/10 rounded-full shadow-md">
                  <SiNodedotjs className="text-green-400 text-lg" />
                </span>
                PERN Stack
              </button>

              {/* FullStack Developer */}
              <button
                type="button"
                className="inline-flex items-center gap-2 text-white 
                bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700
                dark:from-fuchsia-500 dark:to-purple-800
                hover:scale-105 focus:ring-4 focus:outline-none 
                focus:ring-purple-300 dark:focus:ring-purple-800
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 
                shadow-lg transition-all duration-300"
              >
                <CodeBracketIcon className="w-5 h-5" />
                FullStack Developer
              </button>

              {/* Problem Solver */}
              <button
                type="button"
                className="inline-flex items-center gap-2 text-white 
                bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600
                dark:from-sky-500 dark:to-blue-700
                hover:scale-105 focus:ring-4 focus:outline-none 
                focus:ring-cyan-300 dark:focus:ring-sky-800
                font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 
                shadow-lg transition-all duration-300"
              >
                <LightBulbIcon className="w-5 h-5" />
                Problem Solver
              </button>
            </div>

            {/* ===== Description ===== */}
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed">
              <span className="font-extrabold underline underline-offset-4 decoration-4 decoration-blue-400 dark:decoration-blue-600">
                Passion Clean Code
              </span>{" "}
              | Skilled in modern web technologies ⚡ |{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600 dark:from-cyan-300 dark:to-green-500">
                Crafting secure and scalable applications
              </span>{" "}
              📱🚀
            </p>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 w-full sm:w-auto">
              <Link href={"/project"}>
               <SpaceBtn />
              </Link>
              <Link href={"/resume/my-resume"}>
                    <ResumeBtn />
              </Link>
            </div>
          </div>

          {/* ===== Right Column ===== */}
          <div className="order-1 lg:order-2 animate-fade-in-up">
            <Spider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

// Custom Animation
const styles = `
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
  }
`;
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}



















