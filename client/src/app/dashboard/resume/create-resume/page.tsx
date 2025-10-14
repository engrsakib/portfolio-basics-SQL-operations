
"use client";

import { useState } from "react";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Head from "next/head";
import { useAuth } from "@/components/modules/auth/authHook/UseAuth";




export default function CreateProfessionalResume() {
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    degree: "",
    institution: "",
    year: "",
    experience: [
      {
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        details: "",
      },
    ],
    skills: "",
    certifications: "",
    languages: "",
    projectName: "",
    projectDescription: "",
    projectLink: "",
    summary: "",
    portfolioUrl: "",
    linkedinUrl: "",
    githubUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updated = [...form.experience];
    updated[index][e.target.name as keyof typeof updated[0]] = e.target.value;
    setForm({ ...form, experience: updated });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in before creating your resume.",
      });
      return;
    }

    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
      certifications: form.certifications.split(",").map((s) => s.trim()),
      languages: form.languages.split(",").map((s) => s.trim()),
      projects: [
        {
          name: form.projectName,
          description: form.projectDescription,
          link: form.projectLink,
        },
      ],
      education: {
        degree: form.degree,
        institution: form.institution,
        year: form.year,
      },
    };

    try {
      setSubmitting(true);
      const res = await api.post("/resume", payload, { withCredentials: true });
      Swal.fire({
        icon: "success",
        title: "🎉 Resume Created Successfully!",
        text: res.data.message,
        confirmButtonColor: "#3085d6",
      });

      setForm({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        degree: "",
        institution: "",
        year: "",
        experience: [
          { company: "", position: "", startDate: "", endDate: "", details: "" },
        ],
        skills: "",
        certifications: "",
        languages: "",
        projectName: "",
        projectDescription: "",
        projectLink: "",
        summary: "",
        portfolioUrl: "",
        linkedinUrl: "",
        githubUrl: "",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Resume",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading user...</p>;

  return (
    <>
      <Head>
        <title>Create Professional Resume | MyPortfolio</title>
        <meta
          name="description"
          content="Create a professional resume with education, experience and project details. Optimized for SEO and mobile."
        />
      </Head>

      <section className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-10"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text mb-8">
            🧾 Create Professional Resume
          </h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="input-box" required />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="input-box" required />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="input-box" required />
              <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="input-box" required />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <input name="degree" placeholder="Degree" value={form.degree} onChange={handleChange} className="input-box" />
              <input name="institution" placeholder="Institution" value={form.institution} onChange={handleChange} className="input-box" />
              <input name="year" placeholder="Year" value={form.year} onChange={handleChange} className="input-box" />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Experience</h2>
              {form.experience.map((exp, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <input name="company" placeholder="Company" value={exp.company} onChange={(e) => handleExperienceChange(e, i)} className="input-box" />
                  <input name="position" placeholder="Position" value={exp.position} onChange={(e) => handleExperienceChange(e, i)} className="input-box" />
                  <input type="date" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(e, i)} className="input-box" />
                  <input type="date" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(e, i)} className="input-box" />
                  <textarea name="details" placeholder="Details" value={exp.details} onChange={(e) => handleExperienceChange(e, i)} className="input-box sm:col-span-2" />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} className="input-box" />
              <input name="certifications" placeholder="Certifications" value={form.certifications} onChange={handleChange} className="input-box" />
              <input name="languages" placeholder="Languages" value={form.languages} onChange={handleChange} className="input-box" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <input name="projectName" placeholder="Project Name" value={form.projectName} onChange={handleChange} className="input-box" />
              <textarea name="projectDescription" placeholder="Project Description" value={form.projectDescription} onChange={handleChange} className="input-box" />
              <input name="projectLink" placeholder="Project Link" value={form.projectLink} onChange={handleChange} className="input-box" />
            </div>

            <textarea name="summary" placeholder="Professional Summary" value={form.summary} onChange={handleChange} className="input-box" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <input name="portfolioUrl" placeholder="Portfolio URL" value={form.portfolioUrl} onChange={handleChange} className="input-box" />
              <input name="linkedinUrl" placeholder="LinkedIn URL" value={form.linkedinUrl} onChange={handleChange} className="input-box" />
              <input name="githubUrl" placeholder="GitHub URL" value={form.githubUrl} onChange={handleChange} className="input-box" />
            </div>

            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-all"
              >
                {submitting ? "Creating..." : "Create Resume"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      <style jsx>{`
        .input-box {
          @apply w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg 
          bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white 
          focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm sm:text-base;
        }
      `}</style>
    </>
  );
}
