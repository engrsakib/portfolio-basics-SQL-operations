

import React from "react";
import Sidebar from "@/components/modules/sidebar/Sidebar";
import ProtectedRoute from "@/components/modules/auth/authHook/ProjectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
     <ProtectedRoute role="ADMIN">
       <Sidebar />
     </ProtectedRoute>
      <div className="sm:ml-64 p-6">
        {/* Topbar */}
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition">
              + New Project
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}











