"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./UseAuth";

export default function useProtectedRoute(role?: string) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/auth/login");
      } else if (role && user.role !== role) {
        router.push("/unauthorized");
      }
    }
  }, [user, loading, router, role]);

  return { user, loading };
}
