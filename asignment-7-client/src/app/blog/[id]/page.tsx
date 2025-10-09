// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import api from "@/lib/api";
// import { CalendarDays, Eye, User } from "lucide-react";

// interface Blog {
//   id: number;
//   title: string;
//   content: string;
//   views: number;
//   createAt: string;
//   updateAt: string;
//   authorId: number;
// }

// export default function SingleBlogPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     const fetchBlog = async () => {
//       setLoading(true);
//       try {
//         const res = await api.get(`/blog/${id}`, {
//           withCredentials: true,
//         });
//         setBlog(res.data.data);
//       } catch (error) {
//         console.error("Failed to load blog", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlog();
//   }, [id]);

//   if (loading) return <p className="text-center mt-10">Loading...</p>;
//   if (!blog) return <p className="text-center mt-10">No blog found 😔</p>;

//   return (
//     <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
//         <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
//           {blog.title}
//         </h1>
//         <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm mb-6">
//           <span className="flex items-center gap-1">
//             <CalendarDays size={14} /> {new Date(blog.createAt).toLocaleDateString()}
//           </span>
//           <span className="flex items-center gap-1">
//             <Eye size={14} /> {blog.views} views
//           </span>
//         </div>

//         <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
//           {blog.content}
//         </p>
//       </div>
//     </section>
//   );
// }















"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/api";
import { CalendarDays, Eye } from "lucide-react";
import RippleLoader from "@/components/laoding/RippleLoader";
 // optional loader

interface Blog {
  id: number;
  title: string;
  content: string;
  views: number;
  createAt: string;
  updateAt: string;
  author: {
    name: string;
    email: string;
  };
}

export default function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/blog/${id}`, { withCredentials: true });
        setBlog(res.data.data);
      } catch (error) {
        console.error("Failed to load blog", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RippleLoader text="Loading Blog..." />
      </div>
    );

  if (!blog)
    return (
      <p className="text-center mt-10 text-gray-500 dark:text-gray-400">
        No blog found 😔
      </p>
    );

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          {blog.title}
        </h1>
        <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm mb-6">
          <span className="flex items-center gap-1">
            <CalendarDays size={14} />{" "}
            {new Date(blog.createAt).toLocaleDateString()}
          </span>
          <span className="flex items-center gap-1">
            <Eye size={14} /> {blog.views} views
          </span>
        </div>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          {/* <p>
            Author: <strong>{blog.author.name}</strong> (
            {blog.author.email})
          </p> */}
        </div>
      </div>
    </section>
  );
}
