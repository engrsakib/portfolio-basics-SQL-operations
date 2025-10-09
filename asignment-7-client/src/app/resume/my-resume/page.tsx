// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import { motion } from "framer-motion";
// import {
//   CalendarDays,
//   User,
//   Mail,
//   Phone,
//   Linkedin,
//   Globe,
//   Award,
//   Edit2,
//   Trash2,
// } from "lucide-react";
// import Swal from "sweetalert2";
// import Link from "next/link";
// import ProtectedRoute from "@/components/modules/auth/authHook/ProjectedRoute";

// interface Resume {
//   id: number;
//   fullName: string;
//   email: string;
//   phone: string;
//   address: string;
//   education: {
//     degree: string;
//     institution: string;
//     year: string;
//   };
//   experience: {
//     company: string;
//     position: string;
//     startDate: string;
//     endDate: string;
//     details: string;
//   }[];
//   skills: string[];
//   certifications: string[];
//   languages: string[];
//   projects: {
//     name: string;
//     description: string;
//     link: string;
//   }[];
//   summary: string;
//   portfolioUrl?: string;
//   linkedinUrl?: string;
//   githubUrl?: string;
//   user: {
//     id: number;
//     name: string;
//     email: string;
//     role: string;
//     createAt: string;
//   };
// }

// export default function MyResume() {
//   const [resumes, setResumes] = useState<Resume[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchResumes = async () => {
//     try {
//       const res = await api.get("/resume", { withCredentials: true });
//       setResumes(res.data.data);
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Load Resumes",
//         text: error.response?.data?.message || "Something went wrong!",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchResumes();
//   }, []);

//   const handleDelete = async (id: number) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "This resume will be permanently deleted!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#e11d48",
//       cancelButtonColor: "#6b7280",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const res = await api.delete(`/resume/${id}`, { withCredentials: true });
//       Swal.fire({
//         icon: "success",
//         title: "Deleted!",
//         text: res.data.message || "Resume deleted successfully.",
//       });
//       setResumes((prev) => prev.filter((r) => r.id !== id));
//     } catch (error: any) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed to Delete",
//         text: error.response?.data?.message || "Something went wrong!",
//       });
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">
//           Loading all resumes...
//         </p>
//       </div>
//     );

//   if (!resumes.length)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-gray-500 dark:text-gray-400 text-lg">
//           No resumes found!
//         </p>
//       </div>
//     );

//   return (
//       <ProtectedRoute role="USER">

//            <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
//       <motion.h1
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
//       >
//         📄 All Professional Resumes
//       </motion.h1>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//         {resumes.map((resume, index) => (
//           <motion.div
//             key={resume.id}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="group relative"
//           >
//             <div className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden">
//               <div className="p-6 space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">
//                     {resume.fullName}
//                   </h2>
//                   <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold shadow-md">
//                     {resume.user.role}
//                   </span>
//                 </div>

//                 <div className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
//                   <p className="flex items-center gap-2">
//                     <Mail size={15} /> {resume.email}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <Phone size={15} /> {resume.phone}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <User size={15} /> {resume.user.name}
//                   </p>
//                   <p className="flex items-center gap-2">
//                     <CalendarDays size={15} /> Joined:{" "}
//                     {new Date(resume.user.createAt).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div className="mt-3">
//                   <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
//                     🎓 Education
//                   </h3>
//                   <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                     {resume.education.degree}, {resume.education.institution} (
//                     {resume.education.year})
//                   </p>
//                 </div>

//                 {resume.skills?.length > 0 && (
//                   <div>
//                     <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
//                       🧠 Skills
//                     </h3>
//                     <div className="flex flex-wrap gap-2 mt-2">
//                       {resume.skills.map((skill, i) => (
//                         <span
//                           key={i}
//                           className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
//                         >
//                           {skill}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {resume.certifications?.length > 0 && (
//                   <div>
//                     <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-1">
//                       <Award size={15} /> Certifications
//                     </h3>
//                     <ul className="text-xs text-gray-500 dark:text-gray-400 mt-1 list-disc list-inside">
//                       {resume.certifications.map((cert, i) => (
//                         <li key={i}>{cert}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-3">
//                   {resume.summary}
//                 </p>

//                 <div className="pt-3 flex justify-between items-center border-t border-gray-200 dark:border-gray-700">
//                   <Link
//                     href={resume.linkedinUrl || "#"}
//                     target="_blank"
//                     className="text-sm text-indigo-500 hover:text-purple-500 flex items-center gap-1 transition-all"
//                   >
//                     <Linkedin size={15} /> LinkedIn
//                   </Link>
//                   <Link
//                     href={resume.portfolioUrl || "#"}
//                     target="_blank"
//                     className="text-sm text-indigo-500 hover:text-purple-500 flex items-center gap-1 transition-all"
//                   >
//                     <Globe size={15} /> Portfolio
//                   </Link>
//                 </div>

//                 <div className="flex justify-between mt-4">
//                   <Link
//                     href={`/dashboard/resume/all-resume/update/${resume.id}`}
//                     className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow hover:opacity-90 transition-all mx-1"
//                   >
//                     <Edit2 size={15} className="inline mr-1" /> Update
//                   </Link>

//                   <button
//                     onClick={() => handleDelete(resume.id)}
//                     className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium shadow hover:opacity-90 transition-all mx-1"
//                   >
//                     <Trash2 size={15} className="inline mr-1" /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </section>


//       </ProtectedRoute>
//   );
// }


































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

  // ✅ Fetch Resumes
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

  // ✅ Delete Resume
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

  // ✅ Download Resume PDF
  const handleDownloadPDF = async () => {
    try {
      const res = await api.get("/resume/pdf", {
        responseType: "blob", // PDF ডাউনলোডের জন্য
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
        <p className="text-gray-600 dark:text-gray-300 text-lg animate-pulse">
          Loading all resumes...
        </p>
      </div>
    );

  if (!resumes.length)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No resumes found!
        </p>
      </div>
    );

  return (
    <ProtectedRoute role="USER">
      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text"
        >
           My Professional Resume
        </motion.h1>

        {/* ✅ Download Button */}
        <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-center mb-3.5">Download your Lastest Create Resume...</h1>
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow hover:opacity-90 transition-all"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>

        {/* ✅ Resume Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/80 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {resume.fullName}
                  </h2>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-semibold shadow-md">
                    {resume.user.role}
                  </span>
                </div>

                <div className="text-gray-600 dark:text-gray-300 text-sm space-y-1">
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
                  <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                    🎓 Education
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {resume.education.degree}, {resume.education.institution} (
                    {resume.education.year})
                  </p>
                </div>

                {resume.skills?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                      🧠 Skills
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {resume.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {resume.certifications?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-200 flex items-center gap-1">
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
                    className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium shadow hover:opacity-90 transition-all mx-1"
                  >
                    <Edit2 size={15} className="inline mr-1" /> Update
                  </Link>

                  <button
                    onClick={() => handleDelete(resume.id)}
                    className="flex-1 text-center py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-medium shadow hover:opacity-90 transition-all mx-1"
                  >
                    <Trash2 size={15} className="inline mr-1" /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </ProtectedRoute>
  );
}














































