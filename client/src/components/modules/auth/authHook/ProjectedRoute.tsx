

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./UseAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role?: "USER" | "ADMIN";
}

export default function ProtectedRoute({ children, role }: ProtectedRouteProps) {
  const { user, loading } = useAuth(role);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {

      if (!user) {
        router.push("/auth/login");
      } 

      else if (role && user.role !== role && user.role !== "ADMIN") {
        router.push("/unauthorized");
      }
    }
  }, [user, loading, role, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 animate-pulse">
        Checking authentication...
      </div>
    );
  }

  
  if (!user || (role && user.role !== role && user.role !== "ADMIN")) {
    return null;
  }


  return <>{children}</>;
}
