"use client";

import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import api from "@/lib/api";

export default function TodayVisitorCard() {
  const [todayVisitors, setTodayVisitors] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTodayVisitors = async () => {
    try {
      const res = await api.get("/dashboard/today");
      setTodayVisitors(res.data.todayVisitors);
    } catch (err) {
      console.error("Error fetching today's visitors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayVisitors();
  }, []);

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      {/* Decorative Glow/Blur */}
      <div className="absolute -top-20 -left-24 w-60 h-60 bg-[#612DDD]/30 rounded-full blur-3xl -z-10" />
      <div className="absolute top-1/2 right-4 w-24 h-24 bg-[#ff6fd8]/40 rounded-full blur-2xl -z-10" />

      {/* Card */}
      <div className="relative bg-gradient-to-br from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] rounded-3xl shadow-2xl px-7 py-8 flex flex-col items-center animate-fade-in-up">
        <div className="flex items-center gap-4 mb-3">
          <div className="bg-white/20 rounded-full p-3 shadow-lg">
            <FaRegClock className="text-3xl text-white drop-shadow" />
          </div>
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-white via-[#f3eaff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow-lg tracking-wider">
            Today's Visitors
          </h2>
        </div>
        <span className="text-lg text-white/80 mb-2">Live site traffic today</span>

        {/* Count */}
        <div className="my-6 w-full flex justify-center">
          <div className="bg-white/90 dark:bg-[#23214e]/90 rounded-2xl shadow-lg py-6 px-12 flex flex-col items-center border border-[#612DDD]/20">
            <span className="text-xl text-[#612DDD] dark:text-[#9F6BFF] font-semibold mb-2">Total Visitors</span>
            <span className="text-5xl font-extrabold text-[#612DDD] dark:text-[#9F6BFF] drop-shadow-lg tracking-widest">
              {loading ? (
                <span className="animate-pulse text-gray-400">...</span>
              ) : (
                todayVisitors
              )}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-white/90 dark:text-[#f3eaff] text-center mt-2 text-lg font-medium">
          Track how many people visited your site <span className="font-bold">today</span>.
          Stay updated with your site's real-time engagement!
        </p>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(32px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.41,.99,.54,.98) both;
        }
      `}</style>
    </div>
  );
}