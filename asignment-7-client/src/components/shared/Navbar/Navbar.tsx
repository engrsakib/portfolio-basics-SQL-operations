"use client";

import Link from "next/link";
import { useAuth } from "@/components/modules/auth/authHook/UseAuth";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, loading } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Navbar Links
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/PublicPage" },
    { name: "Blogs", href: "/blog" },
    { name: "Projects", href: "/project" },
    { name: "Create Resume", href: "/resume/create-resume" },
    { name: "My Resume", href: "/resume/my-resume" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-gradient-to-r from-[#612DDD]/80 via-[#9F6BFF]/80 to-[#38c7ff]/70 backdrop-blur-xl shadow-lg font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-3xl font-extrabold text-white drop-shadow-lg tracking-wide hover:text-[#FFEECA] transition"
            style={{ letterSpacing: "2px" }}
          >
            EngrSakib
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1 xl:space-x-6 text-white font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg transition duration-200 hover:bg-[#612DDD]/30 hover:text-[#FFEECA] ${
                  pathname === link.href
                    ? "bg-[#612DDD]/80 text-[#FFEECA] shadow"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            ))}

            {!loading && user?.role === "ADMIN" && (
              <Link
                href="/dashboard"
                className="px-3 py-2 rounded-lg bg-yellow-300/20 text-yellow-300 font-semibold hover:bg-yellow-300/30 hover:text-white transition shadow flex items-center gap-1"
              >
                Dashboard
                <span className="inline-block bg-yellow-300 text-[#612DDD] text-xs font-bold px-2 py-1 rounded ml-1">Admin</span>
              </Link>
            )}

            {!loading && !user && (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 rounded-lg transition duration-200 hover:bg-[#612DDD]/30 hover:text-[#FFEECA]"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-3 py-2 rounded-lg transition duration-200 hover:bg-[#612DDD]/30 hover:text-[#FFEECA]"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white focus:outline-none p-2 rounded-full bg-[#612DDD]/30 hover:bg-[#612DDD]/40 transition"
            aria-label="Toggle menu"
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

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-b from-[#612DDD]/90 via-[#9F6BFF]/90 to-[#38c7ff]/80 text-white font-medium px-6 py-4 space-y-2 shadow-2xl border-t border-[#612DDD]/30">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg transition duration-200 hover:bg-[#612DDD]/30 hover:text-[#FFEECA] ${
                pathname === link.href
                  ? "bg-[#612DDD]/80 text-[#FFEECA] shadow"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {!loading && user?.role === "ADMIN" && (
            <Link
              href="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg bg-yellow-300/20 text-yellow-300 font-semibold hover:bg-yellow-300/30 hover:text-white transition shadow sm:flex items-center gap-1"
            >
              Dashboard
              <span className="inline-block bg-yellow-300 text-[#612DDD] text-xs font-bold px-2 py-1 rounded ml-1">Admin</span>
            </Link>
          )}

          {!loading && !user && (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg transition duration-200 hover:bg-[#612DDD]/30 hover:text-[#FFEECA]"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 rounded-lg transition duration-200 hover:bg-[#612DDD]/30 hover:text-[#FFEECA]"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}