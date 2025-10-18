"use client";

import { useState } from "react";
import api from "@/lib/api";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import Head from "next/head";
import { useAuth } from "@/components/modules/auth/authHook/UseAuth";
import { useRouter } from "next/navigation";

// Check Icon SVG (Animated)
const CheckIcon = () => (
  <motion.svg
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    width="22"
    height="22"
    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#612DDD] pointer-events-none"
    fill="none"
    viewBox="0 0 24 24"
  >
    <motion.path
      stroke="#612DDD"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5 12l5 5 9-9"
    />
  </motion.svg>
);

interface ExperienceType {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  details: string;
}

export default function CreatePublicResume() {
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  // Changed fields tracking
  const [changedFields, setChangedFields] = useState<{ [key: string]: boolean }>({});

  const [form, setForm] = useState<{
    fullName: string;
    email: string;
    phone: string;
    address: string;
    degree: string;
    institution: string;
    year: string;
    experience: ExperienceType[];
    skills: string;
    certifications: string;
    languages: string;
    projectName: string;
    projectDescription: string;
    projectLink: string;
    summary: string;
    portfolioUrl: string;
    linkedinUrl: string;
    githubUrl: string;
  }>({
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

  // Input change handler + field tracker
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setChangedFields((prev) => ({ ...prev, [e.target.name]: true }));
  };

  // Experience field handler (fixes TS error)
  const handleExperienceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updated = [...form.experience];
    updated[index] = {
      ...updated[index],
      [e.target.name]: e.target.value,
    };
    setForm({ ...form, experience: updated });
    setChangedFields((prev) => ({ ...prev, [`exp_${index}_${e.target.name}`]: true }));
  };

  // Submit handler (with userId added)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in before creating your resume.",
      });
      return;
    }

    // Prepare payload with userId
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
      userId: user.id, // <-- Send userId to backend for prisma relation
    };

    try {
      setSubmitting(true);
      const res = await api.post("/resume", payload, { withCredentials: true });

      Swal.fire({
        icon: "success",
        title: "🎉 Resume Created Successfully!",
        text: res.data.message,
        confirmButtonColor: "#612DDD",
      });

      router.push("/resume/my-resume");
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
      setChangedFields({});
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Create Resume",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#612DDD",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return <p className="text-center text-[#612DDD] dark:text-[#9F6BFF] mt-10 font-bold text-lg">Loading user...</p>;

  return (
    <>
      <Head>
        <title>Create Professional Resume | MyPortfolio</title>
        <meta
          name="description"
          content="Create a professional resume with education, experience and project details. Optimized for SEO and mobile."
        />
      </Head>

      <section className="min-h-screen w-full bg-gradient-to-br from-[#612DDD] via-[#9F6BFF] to-[#38c7ff] dark:from-[#181038] dark:via-[#612DDD] dark:to-[#23214e] py-12 px-2 sm:px-6 lg:px-12 flex items-center justify-center relative">
        {/* Decorative Glass/Blur Shapes */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#612DDD]/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-60 bg-[#ff6fd8]/30 rounded-full blur-2xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#38c7ff]/30 rounded-full blur-2xl -z-10"></div>
        <div className="absolute top-1/2 right-10 w-36 h-36 bg-[#9F6BFF]/20 rounded-full blur-2xl -z-10"></div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full mx-auto bg-white/80 dark:bg-[#0b1727]/80 rounded-3xl shadow-2xl p-6 sm:p-10 backdrop-blur-lg border border-[#612DDD]/20"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-[#612DDD] via-[#9F6BFF] to-[#38c7ff] text-transparent bg-clip-text drop-shadow-lg">
            🧾 Create Professional Resume
          </h1>
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(["fullName", "email", "phone", "address"] as const).map((field) => (
                <div className="relative" key={field}>
                  <input
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={form[field]}
                    onChange={handleChange}
                    className={`input-box transition-all duration-300 ${
                      changedFields[field]
                        ? "border-2 border-[#612DDD] shadow-purple-glow"
                        : ""
                    }`}
                    required
                  />
                  {changedFields[field] && <CheckIcon />}
                </div>
              ))}
            </div>

            {/* Education */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["degree", "institution", "year"].map((field) => (
                <div className="relative" key={field}>
                  <input
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={String(form[field as keyof typeof form] ?? "")}
                    onChange={handleChange}
                    className={`input-box transition-all duration-300 ${
                      changedFields[field]
                        ? "border-2 border-[#612DDD] shadow-purple-glow"
                        : ""
                    }`}
                  />
                  {changedFields[field] && <CheckIcon />}
                </div>
              ))}
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-lg font-semibold mb-4 text-[#612DDD] dark:text-[#9F6BFF]">Experience</h2>
              {form.experience.map((exp, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  {["company", "position", "startDate", "endDate"].map((field) => (
                    <div className="relative" key={field}>
                      <input
                        name={field}
                        placeholder={field.replace(/([A-Z])/g, ' $1')}
                        value={exp[field as keyof ExperienceType]}
                        onChange={(e) => handleExperienceChange(e, i)}
                        className={`input-box transition-all duration-300 ${
                          changedFields[`exp_${i}_${field}`]
                            ? "border-2 border-[#612DDD] shadow-purple-glow"
                            : ""
                        }`}
                      />
                      {changedFields[`exp_${i}_${field}`] && <CheckIcon />}
                    </div>
                  ))}
                  <div className="relative md:col-span-2">
                    <textarea
                      name="details"
                      placeholder="Details"
                      value={exp.details}
                      onChange={(e) => handleExperienceChange(e, i)}
                      className={`input-box transition-all duration-300 ${
                        changedFields[`exp_${i}_details`]
                          ? "border-2 border-[#612DDD] shadow-purple-glow"
                          : ""
                      }`}
                    />
                    {changedFields[`exp_${i}_details`] && <CheckIcon />}
                  </div>
                </div>
              ))}
            </div>

            {/* Skills/Certifications/Languages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["skills", "certifications", "languages"].map((field) => (
                <div className="relative" key={field}>
                  <input
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={typeof form[field as keyof typeof form] === "string" ? form[field as keyof typeof form] as string : ""}
                    onChange={handleChange}
                    className={`input-box transition-all duration-300 ${
                      changedFields[field]
                        ? "border-2 border-[#612DDD] shadow-purple-glow"
                        : ""
                    }`}
                  />
                  {changedFields[field] && <CheckIcon />}
                </div>
              ))}
            </div>

            {/* Project */}
            <div className="grid grid-cols-1 gap-5">
              <div className="relative">
                <input
                  name="projectName"
                  placeholder="Project Name"
                  value={form.projectName}
                  onChange={handleChange}
                  className={`input-box transition-all duration-300 ${
                    changedFields["projectName"]
                      ? "border-2 border-[#612DDD] shadow-purple-glow"
                      : ""
                  }`}
                />
                {changedFields["projectName"] && <CheckIcon />}
              </div>
              <div className="relative">
                <textarea
                  name="projectDescription"
                  placeholder="Project Description"
                  value={form.projectDescription}
                  onChange={handleChange}
                  className={`input-box transition-all duration-300 ${
                    changedFields["projectDescription"]
                      ? "border-2 border-[#612DDD] shadow-purple-glow"
                      : ""
                  }`}
                />
                {changedFields["projectDescription"] && <CheckIcon />}
              </div>
              <div className="relative">
                <input
                  name="projectLink"
                  placeholder="Project Link"
                  value={form.projectLink}
                  onChange={handleChange}
                  className={`input-box transition-all duration-300 ${
                    changedFields["projectLink"]
                      ? "border-2 border-[#612DDD] shadow-purple-glow"
                      : ""
                  }`}
                />
                {changedFields["projectLink"] && <CheckIcon />}
              </div>
            </div>

            {/* Summary */}
            <div className="relative">
              <textarea
                name="summary"
                placeholder="Professional Summary"
                value={form.summary}
                onChange={handleChange}
                className={`input-box transition-all duration-300 ${
                  changedFields["summary"]
                    ? "border-2 border-[#612DDD] shadow-purple-glow"
                    : ""
                }`}
              />
              {changedFields["summary"] && <CheckIcon />}
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["portfolioUrl", "linkedinUrl", "githubUrl"].map((field) => (
                <div className="relative" key={field}>
                  <input
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1).replace("Url", " URL")}
                    value={typeof form[field as keyof typeof form] === "string" ? form[field as keyof typeof form] as string : ""}
                    onChange={handleChange}
                    className={`input-box transition-all duration-300 ${
                      changedFields[field]
                        ? "border-2 border-[#612DDD] shadow-purple-glow"
                        : ""
                    }`}
                  />
                  {changedFields[field] && <CheckIcon />}
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-10 py-4 bg-gradient-to-r from-[#612DDD] via-[#38c7ff] to-[#ff6fd8] text-white font-bold text-lg rounded-xl shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#612DDD]/30"
              >
                {submitting ? "Creating..." : "Create Resume"}
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      {/* Custom glass input styles */}
      <style jsx>{`
        .input-box {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1.5px solid #612DDD33;
          background: rgba(255,255,255,0.65);
          color: #222;
          font-size: 1rem;
          box-shadow: 0 2px 14px 0 #612DDD0a;
          outline: none;
          transition: border 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .input-box:focus {
          border-color: #612DDD;
          background: rgba(233,232,255,0.85);
          box-shadow: 0 0 0 4px #612DDD22;
        }
        .dark .input-box {
          background: rgba(25,18,50,0.85);
          color: #f2f2f2;
          border-color: #612DDD44;
        }
        .dark .input-box:focus {
          border-color: #9F6BFF;
          background: rgba(25,18,50,0.98);
          box-shadow: 0 0 0 4px #9F6BFF44;
        }
        .shadow-purple-glow {
          box-shadow: 0 0 12px 0 #612DDD66;
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-thumb {
          background: #612DDD66;
          border-radius: 8px;
        }
      `}</style>
      {/* Animation CSS */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(60px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.7s cubic-bezier(.41,.99,.54,.98) both;
        }
      `}</style>
    </>
  );
}