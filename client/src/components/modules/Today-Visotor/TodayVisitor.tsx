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
      setTodayVisitors(res.data.todayVisitors); // Set the fetched today's visitors count
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
    <div className="p-6">
      {/* Title with Gradient Background */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4 rounded-lg shadow-lg mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaRegClock className="text-2xl" />
          <h2 className="text-2xl font-semibold">Today's Visitors</h2>
        </div>
        {/* Total Visitors Counter */}
        <span className="text-lg font-bold text-white">{loading ? "Loading..." : todayVisitors}</span>
      </div>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-300 text-lg mb-6">
        This section shows the total number of visitors who have visited your site today. Stay updated with your site's traffic in real-time.
      </p>

      {/* Today Visitor Stats */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="text-center p-4 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">Today's Visitor Count</h3>
          <p className="text-3xl font-bold text-blue-600">{todayVisitors}</p>
        </div>
      )}
    </div>
  );
}
