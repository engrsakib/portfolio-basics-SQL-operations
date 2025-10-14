

"use server";
import { redirect } from "next/navigation";

export const createBlogPost = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const thumnails = formData.get("thumnails") as string;
    const isfeathered = formData.get("isfeathered") ? true : false;
    const authorId = formData.get("authorId") as string;

    const rawTags = formData.get("tags") as string;
    const tags = rawTags ? rawTags.split(",").map((tag) => tag.trim()) : [];

    const blogData = {
      title,
      content,
      thumnails,
      isFeathered: isfeathered, // ✅ Fix key name
      tags,
      authorId,
    };

    console.log("🚀 API URL:", `${process.env.NEXT_PUBLIC_BASE_API}/post`);
    console.log("📦 Sending Data:", blogData);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create post: ${errorText}`);
    }

    const result = await res.json();
    console.log("✅ Post Created:", result);

    redirect("/blogs");
    return result;
  } catch (error) {
    console.error("❌ Error creating blog:", error);
    throw error;
  }
};
