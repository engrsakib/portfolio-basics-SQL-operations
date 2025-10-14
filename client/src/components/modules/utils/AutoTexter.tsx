"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// Selection Handle
interface SelectionHandleProps {
  position: string;
  color?: string;
}
const SelectionHandle = ({
  position,
  color = "#612DDD",
}: SelectionHandleProps) => (
  <div
    className={`absolute w-4 h-4 border-2 rounded-full ${position}`}
    style={{
      borderColor: color,
      background: "white",
      boxShadow: `0 2px 12px 0 ${color}33`,
    }}
  />
);

// FlipWords: flip animation per word
interface FlipWordsProps {
  words: string[];
  duration?: number;
  className?: string;
}
export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: FlipWordsProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(intervalId);
  }, [words, duration]);

  // Animation variants
  const wordContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
    exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  };
  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.85,
      filter: "blur(10px)",
      color: "#612DDD",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      color: "#612DDD",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.85,
      filter: "blur(8px)",
      color: "#612DDD",
      transition: {
        type: "tween",
        ease: [0.4, 0, 0.6, 1],
        duration: 0.3,
      },
    },
  };

  const currentWord = words[index];

  return (
    <div
      className={`inline-block align-middle overflow-hidden h-[1.2em] leading-none ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWord}
          variants={wordContainerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block whitespace-nowrap"
        >
          {currentWord.split("").map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              variants={letterVariants}
              className="inline-block font-extrabold"
              style={{
                background:
                  "linear-gradient(90deg,#612DDD 60%,#9F6BFF 80%,#38c7ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Main ResizeHandle
const ResizeHandle = () => {
  const phrases = [
    "Software-Engineer",
    "FullStack-Developer",
    "Problem-Solver",
    "UI-UX-Designer",
  ];

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Phudu:wght@700&display=swap');
          .font-phudu {
            font-family: 'Phudu', cursive;
          }
          .glass-bg {
            background: rgba(255,255,255,0.70);
            backdrop-filter: blur(8px);
          }
          .glass-bg-dark {
            background: rgba(30, 10, 60, 0.7);
            backdrop-filter: blur(10px);
          }
        `}
      </style>
      <div className="flex flex-col items-center justify-center p-4 text-center overflow-visible">
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative inline-block my-2"
        >
          {/* Gradient border */}
          <div className="relative">
            <div className="absolute inset-0 pointer-events-none rounded-xl z-10"
              style={{
                padding: "3px",
                background:
                  "linear-gradient(120deg,#612DDD 40%,#9F6BFF 80%,#38c7ff 100%)",
                boxShadow: "0 4px 36px 0 #612DDD22",
              }}
            />
            <div className="relative rounded-xl overflow-hidden shadow-xl glass-bg dark:glass-bg-dark px-4 py-3">
              <div className="font-phudu text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight uppercase flex items-center justify-center z-20">
                <FlipWords words={phrases} duration={2750} />
              </div>
            </div>
          </div>
          {/* Handles */}
          <SelectionHandle position="-top-3 -left-3" color="#612DDD" />
          <SelectionHandle position="-top-3 -right-3" color="#9F6BFF" />
          <SelectionHandle position="-bottom-3 -left-3" color="#38c7ff" />
          <SelectionHandle position="-bottom-3 -right-3" color="#ff6fd8" />
        </motion.div>
      </div>
    </>
  );
};

export default ResizeHandle;