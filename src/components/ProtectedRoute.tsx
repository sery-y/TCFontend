import { Navigate, Outlet } from "react-router-dom";

type Role = "admin" | "agent" | "user";

interface ProtectedRouteProps {
  allowedRoles: Role[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole") as Role | null;

  // ❌ Not logged in
  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but wrong role
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized
  return <Outlet />;
}
