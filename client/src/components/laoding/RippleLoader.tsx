"use client";

import React from "react";

interface RippleLoaderProps {
  size?: number;
  color?: string;
  text?: string;
}

const RippleLoader: React.FC<RippleLoaderProps> = ({
  size = 50,
  color = "blue-600",
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] w-full">
      <div
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <div
          className={`absolute w-full h-full rounded-full border-4 border-${color} opacity-25 animate-ping`}
        ></div>
        <div
          className={`relative w-full h-full rounded-full border-4 border-${color} border-t-transparent animate-spin`}
        ></div>
      </div>

      <p className="mt-5 text-gray-600 text-lg font-medium animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default RippleLoader;
