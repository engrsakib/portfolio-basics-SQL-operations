


// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";

// export default function Sidebar() {
//   const pathname = usePathname();
//   const [openProject, setOpenProject] = useState(false);
//   const [openBlog, setOpenBlog] = useState(false);

//   const getLinkClass = (href: string) => {
//     const base = "flex items-center p-3 rounded-lg transition font-medium";
//     const active =
//       "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md";
//     const normal =
//       "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
//     return pathname === href ? `${base} ${active}` : `${base} ${normal}`;
//   };

//   return (
//     <aside
//       id="logo-sidebar"
//       className="fixed top-0 left-0 z-40 w-64 mx-auto h-screen transition-transform 
//                  -translate-x-full sm:translate-x-0 bg-white dark:bg-gray-900 shadow-lg"
//       aria-label="Sidebar"
//     >
//       <div className="h-full px-4 py-6 overflow-y-auto">
//         <Link href="/" className="flex items-center ps-2.5 mb-8">
//           <img
//             src="https://flowbite.com/docs/images/logo.svg"
//             className="h-7 me-3"
//             alt="Logo"
//           />
//           <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
//             My Dashboard
//           </span>
//         </Link>

//         <ul className="space-y-3">
//           <li>
//             <Link href="/dashboard" className={getLinkClass("/dashboard")}>
//               Dashboard
//             </Link>
//           </li>

//           <li>
//             <Link
//               href="/dashboard/inbox"
//               className={getLinkClass("/dashboard/inbox")}
//             >
//               Inbox
//             </Link>
//           </li>

//           <li>
//             <Link
//               href="/dashboard/user"
//               className={getLinkClass("/dashboard/user")}
//             >
//               Users
//             </Link>
//           </li>

//           <li>
//             <button
//               onClick={() => setOpenProject(!openProject)}
//               className={`w-full flex items-center justify-between p-3 rounded-lg transition font-medium ${
//                 openProject
//                   ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
//                   : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               }`}
//             >
//               <span>Projects</span>
//               <ChevronDownIcon
//                 className={`w-5 h-5 transition-transform ${
//                   openProject ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {openProject && (
//               <ul className="ml-4 mt-2 space-y-2">
//                 <li>
//                   <Link
//                     href="/dashboard/dash-project/create-dash-project"
//                     className={getLinkClass("/dashboard/dash-project/create-dash-project")}
//                   >
//                     ➕ Create Project
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/dash-project/get-all-project"
//                     className={getLinkClass(
//                       "/dashboard/dash-project/get-all-project"
//                     )}
//                   >
//                     📂 All Projects
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li>
//             <button
//               onClick={() => setOpenBlog(!openBlog)}
//               className={`w-full flex items-center justify-between p-3 rounded-lg transition font-medium ${
//                 openBlog
//                   ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
//                   : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
//               }`}
//             >
//               <span>Blogs</span>
//               <ChevronDownIcon
//                 className={`w-5 h-5 transition-transform ${
//                   openBlog ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {openBlog && (
//               <ul className="ml-4 mt-2 space-y-2">
//                 <li>
//                   <Link
//                     href="/dashboard/blog/create-blog"
//                     className={getLinkClass("/dashboard/blog/create")}
//                   >
//                      Create Blog
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/blog/all-blog"
//                     className={getLinkClass("/dashboard/blog/all-blog")}
//                   >
//                      All Blogs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="/dashboard/blog/categories"
//                     className={getLinkClass("/dashboard/blog/categories")}
//                   >
//                      Categories
//                   </Link>
//                 </li>
//               </ul>
//             )}
//           </li>
//         </ul>
//       </div>
//     </aside>
//   );
// }





"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Sidebar() {
  const pathname = usePathname();
  const [openProject, setOpenProject] = useState(false);
  const [openBlog, setOpenBlog] = useState(false);
  const [openResume, setOpenResume] = useState(false); // 🆕 Resume Dropdown State

  const getLinkClass = (href: string) => {
    const base = "flex items-center p-3 rounded-lg transition font-medium";
    const active =
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md";
    const normal =
      "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700";
    return pathname === href ? `${base} ${active}` : `${base} ${normal}`;
  };

  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-64 mx-auto h-screen transition-transform 
                 -translate-x-full sm:translate-x-0 bg-white dark:bg-gray-900 shadow-lg"
      aria-label="Sidebar"
    >
      <div className="h-full px-4 py-6 overflow-y-auto">
        <Link href="/" className="flex items-center ps-2.5 mb-8">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-7 me-3"
            alt="Logo"
          />
          <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">
            Portfolio Dashboard
          </span>
        </Link>

        <ul className="space-y-3">
          <li>
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              Dashboard
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/device-activity"
              className={getLinkClass("/dashboard/device-activity")}
            >
              Device Activity Log
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/today-visitor"
              className={getLinkClass("/dashboard/today-visitor")}
            >
              Today Visitor
            </Link>
          </li>

          <li>
            <Link
              href="/dashboard/user"
              className={getLinkClass("/dashboard/user")}
            >
              Users
            </Link>
          </li>

          {/* 🧩 Project Dropdown */}
          <li>
            <button
              onClick={() => setOpenProject(!openProject)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition font-medium ${
                openProject
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span>Projects</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  openProject ? "rotate-180" : ""
                }`}
              />
            </button>

            {openProject && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    href="/dashboard/dash-project/create-dash-project"
                    className={getLinkClass(
                      "/dashboard/dash-project/create-dash-project"
                    )}
                  >
                     Create Project
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/dash-project/get-all-project"
                    className={getLinkClass(
                      "/dashboard/dash-project/get-all-project"
                    )}
                  >
                     All Projects
                  </Link>
             
                </li>

                {/* Top Clicked 4 projects */}
                <li>
                  <Link
                    href="/dashboard/dash-project/top-click"
                    className={getLinkClass(
                      "/dashboard/dash-project/top-click"
                    )}
                  >
                     Top Click-(4)
                  </Link>
             
                </li>
              </ul>
            )}
          </li>

          {/* 📰 Blog Dropdown */}
          <li>
            <button
              onClick={() => setOpenBlog(!openBlog)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition font-medium ${
                openBlog
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span>Blogs</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  openBlog ? "rotate-180" : ""
                }`}
              />
            </button>

            {openBlog && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    href="/dashboard/blog/create-blog"
                    className={getLinkClass("/dashboard/blog/create-blog")}
                  >
                     Create Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/blog/all-blog"
                    className={getLinkClass("/dashboard/blog/all-blog")}
                  >
                     All Blogs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/blog/categories"
                    className={getLinkClass("/dashboard/blog/categories")}
                  >
                    🏷️ Categories
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* 🧾 Resume Dropdown */}
          <li>
            <button
              onClick={() => setOpenResume(!openResume)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition font-medium ${
                openResume
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md"
                  : "text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span>Resume</span>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform ${
                  openResume ? "rotate-180" : ""
                }`}
              />
            </button>

            {openResume && (
              <ul className="ml-4 mt-2 space-y-2">
                <li>
                  <Link
                    href="/dashboard/resume/create-resume"
                    className={getLinkClass("/dashboard/resume/create-resume")}
                  >
                     Create Resume
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/resume/all-resume"
                    className={getLinkClass("/dashboard/resume/get-all-resume")}
                  >
                     All Resume
                  </Link>
                </li>
                <li>
                  
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </aside>
  );
}


