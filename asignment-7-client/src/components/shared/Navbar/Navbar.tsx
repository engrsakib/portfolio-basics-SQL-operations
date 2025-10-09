
"use client";

import Link from "next/link";
import { useAuth } from "@/components/modules/auth/authHook/UseAuth";
import api from "@/lib/api";
import { useState } from "react";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-extrabold text-white drop-shadow-sm"
          >
            HakimDev..
          </Link>

          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <Link href="/">Home</Link>
            <Link href="/PublicPage">About</Link>
            <Link href="/blog">Blogs</Link>
            <Link href="/project">Projects</Link>
            <Link href="/resume/create-resume">Create Resume</Link>
            <Link href="/resume/my-resume">My Resume</Link>
              <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>



            {!loading && user?.role === "ADMIN" && (
              <Link
                href="/dashboard"
                className="text-yellow-300 font-semibold hover:text-white transition"
              >
                Dashboard
              </Link>
            )}

            {!loading && user ? (
              <></> // Logout Removed
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-700 via-purple-700 to-indigo-700 text-white font-medium px-6 py-4 space-y-3 shadow-lg">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blogs</Link>
          <Link href="/projects" onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link href="/resume/create-resume" onClick={() => setMenuOpen(false)}>Create Resume</Link>
          <Link href="/resume/my-resume" onClick={() => setMenuOpen(false)}>My Resume</Link>

          {!loading && user?.role === "ADMIN" && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="text-yellow-300"
            >
              Dashboard
            </Link>
          )}

          {!loading && user ? (
            <></> // Logout Removed
          ) : (
            <>
              <Link href="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}



















