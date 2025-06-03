import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthStore();

  if (user) return <Navigate to="/welcome" replace />;
  return children;
};
