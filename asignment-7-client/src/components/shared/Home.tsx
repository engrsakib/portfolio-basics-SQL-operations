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
    <div className="min-h-screen w-full relative flex items-center justify-center font-poppins p-4 sm:p-6 lg:p-8 overflow-hidden bg-gradient-to-br from-[#612DDD] via-[#9F6BFF] to-[#38c7ff]">
      {/* Decorative Glass Circles */}
      <div className="absolute top-0 left-0 w-40 h-40 bg-[#612DDD]/30 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#38c7ff]/20 rounded-full blur-2xl z-0"></div>
      <div className="absolute top-1/2 left-2/3 w-32 h-32 bg-[#ff6fd8]/20 rounded-full blur-2xl z-0"></div>

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
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-[#612DDD] dark:text-white drop-shadow-xl">
                <span className="bg-gradient-to-r from-[#612DDD] via-[#9F6BFF] to-[#38c7ff] bg-clip-text text-transparent">
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
                bg-gradient-to-r from-[#612DDD] to-[#38c7ff]
                hover:from-[#38c7ff] hover:to-[#612DDD]
                focus:outline-none
                font-semibold rounded-xl text-base px-6 py-3
                shadow-lg shadow-[#612DDD]/40 hover:shadow-[#38c7ff]/60
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
                bg-gradient-to-r from-[#9F6BFF] via-[#612DDD] to-[#38c7ff]
                hover:from-[#38c7ff] hover:to-[#612DDD]
                focus:outline-none
                font-semibold rounded-xl text-base px-6 py-3
                shadow-lg shadow-[#612DDD]/30 hover:shadow-[#ff6fd8]/50
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
                bg-gradient-to-r from-[#612DDD] via-[#9F6BFF] to-[#38c7ff]
                hover:scale-105 focus:ring-4 focus:outline-none
                focus:ring-[#612DDD]/30
                font-semibold rounded-xl text-base px-5 py-2.5
                shadow-lg transition-all duration-300"
              >
                <CodeBracketIcon className="w-5 h-5" />
                FullStack Developer
              </button>

              {/* Problem Solver */}
              <button
                type="button"
                className="inline-flex items-center gap-2 text-white
                bg-gradient-to-r from-[#38c7ff] via-[#9F6BFF] to-[#612DDD]
                hover:scale-105 focus:ring-4 focus:outline-none
                focus:ring-[#38c7ff]/30
                font-semibold rounded-xl text-base px-5 py-2.5
                shadow-lg transition-all duration-300"
              >
                <LightBulbIcon className="w-5 h-5" />
                Problem Solver
              </button>
            </div>

            {/* ===== Description ===== */}
            <p className="text-[#3d2366] dark:text-[#ddd] text-lg sm:text-xl lg:text-2xl max-w-lg leading-relaxed bg-white/40 dark:bg-black/40 rounded-xl px-4 py-2 shadow-lg">
              <span className="font-extrabold underline underline-offset-4 decoration-4 decoration-[#612DDD] dark:decoration-[#38c7ff]">
                Passion Clean Code
              </span>{" "}
              | Skilled in modern web technologies ⚡ |{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38c7ff] to-[#612DDD] dark:from-cyan-300 dark:to-purple-500">
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
            <div className="relative flex items-center justify-center">
              <div className="absolute -top-8 -right-8 w-28 h-28 bg-[#612DDD]/30 rounded-full blur-2xl z-0"></div>
              <Spider />
            </div>
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
    from { opacity: 0; transform: translateY(40px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in-up {
    animation: fade-in-up 0.7s cubic-bezier(.41,.99,.54,.98) both;
  }
`;
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}