

// "use client";

// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import { FiExternalLink, FiUser, FiMail } from "react-icons/fi";
// import Link from "next/link";
// import { VscLiveShare } from "react-icons/vsc";

// interface User {
//   name: string;
//   email: string;
// }

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   features: string[];
//   thumbnail: string[];
//   liveUrl: string;
//   clickCount: number;
//   createAt: string;
//   user?: User;
// }

// const featureColors = [
//   "from-pink-400 to-red-500",
//   "from-blue-300 to-sky-500",
//   "from-green-400 to-emerald-500",
//   "from-purple-400 to-indigo-500",
//   "from-yellow-400 to-orange-500",
// ];

// export default function ProjectList() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(false);

//   // 🔍 Filters
//   const [search, setSearch] = useState("");
//   const [feature, setFeature] = useState("");
//   const [minClick, setMinClick] = useState(0);
//   const [maxClick, setMaxClick] = useState(1000);
//   const [sortOrder, setSortOrder] = useState("desc");

//   // 📄 Pagination
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchProjects = async () => {
//     setLoading(true);
//     try {
//       const res = await api.get(
//         `/project?page=${page}&limit=6&search=${search}&features=${feature}&minClick=${minClick}&maxClick=${maxClick}&sortBy=clickCount&order=${sortOrder}`
//       );
//       setProjects(res.data.data.data || []);
//       setTotalPages(res.data.data.totalPages || 1);
//     } catch (err) {
//       console.error("Error fetching projects", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, [search, feature, minClick, maxClick, sortOrder, page]);

//   return (
//     <div className="p-6">
//       {/* 🔍 Filter Bar */}
//       <div className="flex flex-wrap items-center gap-4 mb-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
//         <input
//           type="text"
//           placeholder="Search projects..."
//           value={search}
//           onChange={(e) => {
//             setPage(1);
//             setSearch(e.target.value);
//           }}
//           className="border rounded px-3 py-2 w-48"
//         />

//         <select
//           value={feature}
//           onChange={(e) => {
//             setPage(1);
//             setFeature(e.target.value);
//           }}
//           className="border rounded px-3 py-2"
//         >
//           <option value="">All Features</option>
//           <option value="Responsive design">Responsive Design</option>
//           <option value="Dark mode toggle">Dark Mode</option>
//           <option value="SEO optimized">SEO Optimized</option>
//         </select>

//         <input
//           type="number"
//           value={minClick}
//           onChange={(e) => {
//             setPage(1);
//             setMinClick(Number(e.target.value));
//           }}
//           placeholder="Min Clicks"
//           className="border rounded px-3 py-2 w-28"
//         />
//         <input
//           type="number"
//           value={maxClick}
//           onChange={(e) => {
//             setPage(1);
//             setMaxClick(Number(e.target.value));
//           }}
//           placeholder="Max Clicks"
//           className="border rounded px-3 py-2 w-28"
//         />

//         <select
//           value={sortOrder}
//           onChange={(e) => {
//             setPage(1);
//             setSortOrder(e.target.value);
//           }}
//           className="border rounded px-3 py-2"
//         >
//           <option value="desc">Most Clicked</option>
//           <option value="asc">Least Clicked</option>
//         </select>
//       </div>

//       {/* Project Cards */}
//       {loading ? (
//         <p className="text-center">Loading projects...</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {projects.map((p) => (
//             <div
//               key={p.id}
//               className="group relative border rounded-xl shadow-lg bg-white dark:bg-gray-900 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
//             >
//               {/* Thumbnail */}
//               <div className="relative">
//                 {p.thumbnail?.[0] && (
//                   <img
//                     src={p.thumbnail[0]}
//                     alt={p.title}
//                     className="h-40 w-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                 )}
//                 <span className="absolute top-2 left-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full shadow">
//                   New
//                 </span>
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <h3 className="text-2xl font-semibold opacity-[80%] group-hover:text-indigo-600 transition">
//                   {p.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 text-md opacity-[65%] mt-1 line-clamp-2">
//                   {p.description}
//                 </p>

//                 {/* Features */} 
//                 <div className="flex flex-wrap gap-2 mt-5">
//                   {p.features.map((f, i) => (
//                     <span
//                       key={i}
//                       className={`px-2  mt-[-7px] text-[14px]  font-bold rounded bg-gray-100 dark:bg-gray-800 bg-clip-text opacity-[70%]  text-transparent bg-gradient-to-r ${
//                         featureColors[i % featureColors.length]
//                       }`}
//                     >
//                       {f}
//                     </span>
//                   ))}
//                 </div>

//                 {/* Footer */}
//                 <div className="flex flex-col gap-2 mt-4 text-sm">
//                   <div className="flex justify-between text-md font-bold text-gray-500 dark:text-gray-400">
//                     <span>
//                       Created:{" "}
//                       {new Date(p.createAt).toLocaleDateString("en-GB", {
//                         day: "2-digit",
//                         month: "short",
//                         year: "numeric",
//                       })}
//                     </span>
//                     <span>Clicks: {p.clickCount}</span>
//                   </div>

//                   {p.user && (
//                     <div className="mt-2 flex flex-col gap-1 text-gray-700 dark:text-gray-300 tex-lg text-shadow-2xs font-medium opacity-[55%] mb-10">
//                       <span className="flex items-center gap-2">
//                         <FiUser /> {p.user.name}
//                       </span>
//                       <span className="flex items-center gap-2">
//                         <FiMail /> {p.user.email}
//                       </span>

//                       <div className="flex gap-40 items-center">
//                         {/* live btn */}

//                       <button className="text-white mt-3  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none w-[30%] px-2.5 py-1  rounded-md flex justify-center items-center gap-1 text-lg">
//                         <VscLiveShare /> Live
//                       </button>

//                       {/* views More BTn */}

//                      <Link href={`/project/${p.id}`}>
//                      <button  
//                      className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br
//                       text-md rounded-md py-2 px-10"
//                      >View </button>
//                      </Link>

//                       </div>

//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* 📌 Pagination */}
//       <div className="flex justify-center gap-4 mt-6">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage((p) => p - 1)}
//           className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 disabled:opacity-50"
//         >
//           Prev
//         </button>
//         <span className="text-sm font-medium">
//           Page {page} of {totalPages}
//         </span>
//         <button
//           disabled={page === totalPages}
//           onClick={() => setPage((p) => p + 1)}
//           className="px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }
