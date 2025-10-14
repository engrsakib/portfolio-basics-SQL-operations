


"use client";

import api from "@/lib/api";
import { useEffect, useState } from "react";

export function useAuth(requiredRole?: "USER" | "ADMIN") {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me", { withCredentials: true });
        const userData = res.data.user;


        if (
          requiredRole &&
          userData.role !== requiredRole &&
          userData.role !== "ADMIN"
        ) {
          setUser(null);
        } else {
          setUser(userData);
        }
      } catch (error: any) {
        console.error("Auth check failed:", error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [requiredRole]);

  return { user, loading };
}
