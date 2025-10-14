"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { motion } from "framer-motion";
import {
  CalendarDays,
  User,
  Mail,
  Phone,
  Linkedin,
  Globe,
  Award,
  Edit2,
  Trash2,
  Download,
} from "lucide-react";
import Swal from "sweetalert2";
import Link from "next/link";
import ProtectedRoute from "@/components/modules/auth/authHook/ProjectedRoute";

interface Resume {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    details: string;
  }[];
  skills: string[];
  certifications: string[];
  languages: string[];
  projects: {
    name: string;
    description: string;
    link: string;
  }[];
  summary: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    createAt: string;
  };
}

export default function MyResume() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Resumes
  const fetchResumes = async () => {
    try {
      const res = await api.get("/resume", { withCredentials: true });
      setResumes(res.data.data);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Load Resumes",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  // Delete Resume
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This resume will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await api.delete(`/resume/${id}`, { withCredentials: true });
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: res.data.message || "Resume deleted successfully.",
      });
      setResumes((prev) => prev.filter((r) => r.id !== id));
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Delete",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  // Download Resume PDF
  const handleDownloadPDF = async () => {
    try {
      const res = await api.get("/resume/pdf", {
        responseType: "blob",
        withCredentials: true,
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: error.response?.data?.message || "Resume not found or unauthorized!",
      });
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#612DDD] dark:text-[#9F6BFF] text-lg animate-pulse font-semibold">
          Loading all resumes...
        </p>
      </div>
    );

  if (!resumes.length)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#612DDD] dark:text-[#9F6BFF] text-lg font-bold">
          No resumes found!
        </p>
      </div>
    );

  return (
    <ProtectedRoute role="USER">
      <section className="min-h-screen bg-gradient-to-br mt-3.5 from-[#612DDD]/10 via-[#e8e5ff]/60 to-[#38c7ff]/10 dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] py-14 px-2 sm:px-6 lg:px-12 relative overflow-hidden">
        {/* Decorative Blurs */}
        <div className="absolute -top-32 -left-32 w-[340px] h-[340px] bg-[#612DDD]/30 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/2 right-8 w-44 h-44 bg-[#9F6BFF]/20 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52 h-52 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#38c7ff]/30 rounded-full blur-2xl -z-10" />

        {/* Title + Download */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-transparent bg-clip-text drop-shadow-xl"
        >
          My Professional Resume
        </motion.h1>
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#612DDD] dark:text-[#9F6BFF]">Download your Latest Resume...</h2>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-white font-semibold rounded-xl shadow-lg hover:scale-105 hover:shadow-purple-glow transition-all duration-200"
          >
            <Download size={20} /> Download PDF
          </button>
        </div>

        {/* Resume Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="group bg-white/90 dark:bg-[#181038]/80 backdrop-blur-xl rounded-3xl border border-[#612DDD]/10 shadow-lg 
                hover:shadow-2xl hover:shadow-[#612DDD]/50
                transform hover:-translate-y-2 transition-all duration-300 overflow-hidden relative"
              style={{
                boxShadow: "0 8px 32px 0 #612DDD22",
              }}
            >
              {/* Card Glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-70 transition-all duration-300"
                style={{
                  background: "radial-gradient(ellipse at 60% 20%, #612DDD88 20%, transparent 75%)",
                  filter: "blur(20px)",
                }}
              />
              <div className="p-6 space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-[#612DDD] dark:text-[#9F6BFF] drop-shadow">
                    {resume.fullName}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white text-xs font-bold shadow-md">
                    {resume.user.role}
                  </span>
                </div>
                <div className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                  <p className="flex items-center gap-2">
                    <Mail size={15} /> {resume.email}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={15} /> {resume.phone}
                  </p>
                  <p className="flex items-center gap-2">
                    <User size={15} /> {resume.user.name}
                  </p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={15} /> Joined:{" "}
                    {new Date(resume.user.createAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="mt-3">
                  <h3 className="font-semibold text-sm text-[#612DDD] dark:text-[#9F6BFF]">
                    🎓 Education
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {resume.education.degree}, {resume.education.institution} (
                    {resume.education.year})
                  </p>
                </div>

                {resume.skills?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-[#612DDD] dark:text-[#9F6BFF]">
                      🧠 Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {resume.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-[#612DDD]/10 text-[#612DDD] dark:bg-[#9F6BFF]/20 dark:text-[#9F6BFF] font-bold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resume.certifications?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-[#612DDD] dark:text-[#9F6BFF] flex items-center gap-1">
                      <Award size={15} /> Certifications
                    </h3>
                    <ul className="text-xs text-gray-500 dark:text-gray-400 mt-1 list-disc list-inside">
                      {resume.certifications.map((cert, i) => (
                        <li key={i}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between mt-4">
                  <Link
                    href={`/dashboard/resume/all-resume/update/${resume.id}`}
                    className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-[#612DDD] to-[#38c7ff] text-white text-sm font-bold shadow hover:scale-105 hover:shadow-purple-glow transition-all mx-1"
                  >
                    <Edit2 size={15} className="inline mr-1" /> Update
                  </Link>

                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold shadow hover:scale-105 hover:shadow-red-500/60 transition-all mx-1"
                  >
                    <Trash2 size={15} className="inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Card Glow CSS */}
      <style jsx>{`
        .shadow-purple-glow {
          box-shadow: 0 0 18px 0 #612DDD88 !important;
        }
      `}</style>
    </ProtectedRoute>
  );
}