"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

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
}

export default function UpdateResumePage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ✅ Load Existing Resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get(`/resume/${id}`, { withCredentials: true });
        setForm(res.data.data); 
      } catch (error: any) {   
        Swal.fire({
          icon: "error",
          title: "Failed to load resume!",
          text: error.response?.data?.message || "Something went wrong!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchResume();
  }, [id]);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Education Change
  const handleEducationChange = (field: keyof Resume["education"], value: string) => {
    if (!form) return;
    setForm({ ...form, education: { ...form.education, [field]: value } });
  };

  // ✅ Handle Update Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;

    try {
      setUpdating(true);
      const res = await api.put(`/resume/${id}`, form, { withCredentials: true });
      Swal.fire({
        icon: "success",
        title: "Resume Updated!",
        text: res.data.message,
      });
      router.push("/dashboard/resume/all-resume");
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-600" />
        <p className="ml-2 text-gray-600 dark:text-gray-300">Loading resume...</p>
      </div>
    );

  if (!form)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 dark:text-gray-300">
        Resume not found.
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          ✏️ Update Resume
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="input-box"
            />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="input-box"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="input-box"
            />
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              className="input-box"
            />
          </div>

          {/* Education */}
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">🎓 Education</h3>
            <div className="grid md:grid-cols-3 gap-6 mt-2">
              <input
                value={form.education.degree}
                onChange={(e) => handleEducationChange("degree", e.target.value)}
                placeholder="Degree"
                className="input-box"
              />
              <input
                value={form.education.institution}
                onChange={(e) => handleEducationChange("institution", e.target.value)}
                placeholder="Institution"
                className="input-box"
              />
              <input
                value={form.education.year}
                onChange={(e) => handleEducationChange("year", e.target.value)}
                placeholder="Year"
                className="input-box"
              />
            </div>
          </div>

          {/* Skills */}
          <div>
            <h3 className="font-semibold text-gray-700 dark:text-gray-300">🧠 Skills</h3>
            <textarea
              name="skills"
              value={form.skills.join(", ")}
              onChange={(e) =>
                setForm({ ...form, skills: e.target.value.split(",").map((s) => s.trim()) })
              }
              placeholder="Comma separated skills (e.g. React, Node.js, Prisma)"
              className="input-box"
            />
          </div>

          {/* Summary */}
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="Professional Summary"
            className="input-box"
          />

          {/* URLs */}
          <div className="grid md:grid-cols-3 gap-6">
            <input
              name="portfolioUrl"
              value={form.portfolioUrl || ""}
              onChange={handleChange}
              placeholder="Portfolio URL"
              className="input-box"
            />
            <input
              name="linkedinUrl"
              value={form.linkedinUrl || ""}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              className="input-box"
            />
            <input
              name="githubUrl"
              value={form.githubUrl || ""}
              onChange={handleChange}
              placeholder="GitHub URL"
              className="input-box"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <button
              type="submit"
              disabled={updating}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all"
            >
              {updating ? "Updating..." : "Update Resume"}
            </button>
          </div>
        </form>
      </motion.div>

      <style jsx>{`
        .input-box {
          @apply w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all;
        }
      `}</style>
    </section>
  );
}
